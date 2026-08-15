---
title: "The Dotfiles Series: Sync and Shell"
date: "2024-08-16"
excerpt: "Exploring dotfile syncing mechanisms and shell configuration. Part two in the dotfiles series."
tags: [Dotfiles, Linux, Configuration]
---

> This is the second part in a series of figuring out dofiles. If you haven’t read the first post, read [here](https://www.bhagat.zone/writing/the-dotfiles-series/).

In the last post, we looked at dotfiles and about their different syncing mechanims, some popular approaches in the community and why we should sync them.

I also checked out [GNU Stow](https://www.gnu.org/savannah-checkouts/gnu/stow/manual/stow.html), which is a “symlink farm manager”. Basically a program which will manage symlinks for you, so that you can symlink your dotfiles to a different directory, and a program called [chezmoi](https://www.chezmoi.io/) which also follows a git-based mechanim and includes templates, encryption and an out-of-the-box setup process. 

But, I went ahead with a system recommended by [Drew Devault](https://drewdevault.com/), which basically makes my root directory a git repository, and by default everything in the root directory is ignored using gitignore. We force-add (by-design) files which we want to keep a track of, and the rest if upto us. When we want to sync it back, we just run a git-pull and everything should work as-is. This was fairly easy to setup, and was just enough to get me started as I’m already familiar with git.

Now that we know _how_ are we going to save and update our files, it comes down to _what_ to store here.

### The Shell
The basic building block of any UNIX based setup is the _shell_. A shell is kind of a command line interpreter that acts as a translator between human-written commands and computer instructions.

If you’ve heard words like _bash_ or _zsh_ thrown like anything in conversations, these are (probably) the most popular shell types on the planet.  There are a LOT of open source options nowadays, with [fish](www.fishshell.com) and [nushell](www.nushell.sh) being next in line in popularity. I’ve tried these out, and they are great, but they are too complex for my needs. They serve a great deal of purpose and utility for the people who use them, but I’d like to keep it simple.

So, with all said and done, there are a couple of shell aliases that I want to start my config with. I keep them handy and they’ve become muscle memory so I can execute them on any system I own. This also might be a good point to add an alias for our sync mechanism to we don’t have to be very specific while doing it, we can just run it from anywhere we want.

You can find my [github repo](https://github.com/xorforce/dotfiles) here and the aliases I added [here](https://github.com/xorforce/dotfiles/commit/7f091cfe5183b8e20c79d0298e5858548f9ca50c).

In the next post, we’ll probably talk about the most interesting part of this series, the prompt.

Till then, happy hacking!
