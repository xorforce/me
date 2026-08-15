---
title: "The Dotfiles Series"
date: "2024-08-08"
excerpt: "A multi-part series exploring dotfiles, syncing mechanisms, and system configuration."
tags: [Dotfiles, Linux, Configuration]
---

> This is going to be a multi-part series where I dabble the world of dotfiles for my systems, documenting steps, decisions and explorations.

Dotfiles are a way to replicate your custom settings for different applications across computer systems. The term “dotfiles” literally comes from the actual files that configure an application you might have come across, like a `.vimrc` or a `.zshrc`. 

A lot of these files collectively let you configure most of your system settings in a _flash_, saving hours of redoing stuff you’ve already spent more time than necessary doing.

Having owning multiple systems now for work, projects and just an idle computer serving as a “server”, it occured to me that it might be a right time to do this. I’m gonna take it slow, fix foundational stuff first, like syncing (probably auto-sync?), mechanism of syncing and then adding/deleting should not take much time. I know for a fact that I have to decide the right mechanism, for it can last me (or my agent) a couple of decades.

Browing the web, I came across so many resources on how popular dotfiles as a mechanism exist for people already. [Awesome Dotfiles](https://dotfiles.github.io/tutorials/) helped me the most, providing quick links for famous approaches to store/navigate/sync dotfiles.

The one that particularly caught my eye was from [Drew Devault](https://drewdevault.com/), describing how he [manages hit dotfiles as a git repo](https://drewdevault.com/blog/dotfiles/). This approach caught my eye because rather than symlinking stuff and accidentally commiting something that I’m not supposed to from my home directory, I intentially force-commit stuff that I want to with no room for error. Pretty interesting stuff.

I have to try this out, and if this works out, it will be a charm. I’ll do some trial and error commits in a private repository to test this out, and continue this series with the first and the most important part of any dev’s setup, the shell config.

Till then, keep hacking!
