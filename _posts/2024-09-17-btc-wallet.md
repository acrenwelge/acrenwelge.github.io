---
layout: post
title:  "Bitcoin Wallet"
date:   2024-09-17 12:00:00 -0600
categories: 
---
Last year I wanted to build up my Python skills and dive deep into Bitcoin. I decided to build a [Bitcoin wallet](https://github.com/acrenwelge/btc-wallet) from scratch. I had already read and followed along with the exercises in [Programming Bitcoin](https://programmingbitcoin.com/programming-bitcoin-book/), so a wallet prototype seemed like a good next step.

<!--end excerpt-->

The wallet is a CLI application that allows you to generate a mnemonic seed phrase for a new HD wallet (more on what that is below), restore an existing HD wallet from a seed phrase, store and manage a list of contacts' bitcoin addresses, and send bitcoin to your contacts. The wallet uses testnet by default, but you can switch to mainnet by setting the mode flag to `prod`.

Let me take a few examples to show some of the core functions. The core entity that manages the user's bitcoin private keys is the `WalletManager` class. Probably the first thing you'll want to do is generate a new wallet, so there's a function to do that:

{% highlight python %}
def generate(self, bip32_passphrase: str = "", encryption_password: str = ""):
  """Uses BIP-39 to generate a new seed and save it to a file.
  Initializes the BIP-32 HD wallet with the seed.
  """
  if self.has_wallet():
      raise WalletAlreadyExistsError
  # Generate seed, passphrase optional (BIP-39)
  mnemo = Mnemonic("english")
  words = mnemo.generate(strength=128)
  bin_seed = mnemo.to_seed(words, passphrase=bip32_passphrase)
  self.hdwallet = BIP32.from_seed(bin_seed)
  # encrypt and save salt if encryption password provided
  if encryption_password != "":
      encrypted_seed, salt = encrypt_seed(bin_seed, encryption_password)
      with open(self.saltfile, "wb+") as file_out:
          file_out.write(salt)
          logging.info("Random salt saved to file")
      bin_seed = encrypted_seed
  with open(self.seedfile, "wb+") as file_out:
      file_out.write(bin_seed)
  # entropy data
  entropy_byte_arr = mnemo.to_entropy(words)
  readable_entr = "".join("{:02x}".format(x) for x in entropy_byte_arr)
  return [words, bin_seed, readable_entr]
{% endhighlight %}

The `generate` function generates a new seed phrase, initializes the HD wallet with the seed, and saves the seed to a file. The seed can be encrypted with a password if desired.

One of the amazing things about bitcoin is how portable it is - you just need to memorize 12 words and you can bring your bitcoin anywhere in your head with you. If you already have a seed phrase, you can load that into the wallet using the `WalletManager.recover()` function:

{% highlight python %}
def recover(self, words, bip32_passphrase="", encryption_password=""):
  if self.has_wallet():
      raise WalletAlreadyExistsError
  mnemo = Mnemonic("english")
  bin_seed = mnemo.to_seed(words, passphrase=bip32_passphrase)
  # encrypt and save salt if encryption password provided
  if encryption_password != "":
      encrypted_seed, salt = encrypt_seed(bin_seed, encryption_password)
      with open(self.saltfile, "wb+") as file_out:
          file_out.write(salt)
          logging.info("Random salt saved to file")
      bin_seed = encrypted_seed
  with open(self.seedfile, "wb+") as file:
      file.write(bin_seed)
      logging.info("Binary seed saved to file")
  self.hdwallet = BIP32.from_seed(bin_seed)
  logging.info("Wallet recovered!")
{% endhighlight %}

You might notice a reference to "BIP"s in the comments. BIP-39 is a Bitcoin Improvement Proposal that defines a standard for mnemonic codes for generating deterministic keys. The wallet uses a BIP-39 compliant library to generate and recover seed phrases.

BIP-32 defines a standard for *hierarchical, deterministic* wallets. Basically this means that you can use one key (the root key) to derive others in a tree-like structure. BIP-32 specifies which levels of the tree are used for different purposes, such as for different cryptocurrencies or for different accounts within a wallet. Using BIP-32, the wallet can generate a new address for each transaction without needing to back up the wallet each time.

