---
title: "The Dotfiles Series: The First Mistake"
date: "2024-08-24"
excerpt: "Undoing the root-as-git-repo setup and moving to a symlinked dotfiles folder with a sync script. Part three in the dotfiles series."
tags: [Dotfiles, Linux, Configuration]
---

## The Dotfiles Series: The First Mistake
> This is the third part in a series of figuring out dotfiles. If you haven’t read the first post, read [here](https://www.bhagat.zone/writing/the-dotfiles-series/).

Earlier in the series, we looked at how I made my entire root directory as a git repository, ignored everything and force added what I needed to track, which were only my dotfiles. I assumed it would work beautifully because it seemed so simple and intuitive to have that as the setup. 

But ever since I did that, my terminal has been irking me with a constant branch with node and python environments info on my system prompt. It has irritated me quite a lot than what I had imagined on the first day, for which I don’t know the reason. 

So, we’re gonna undo that right now. We’ll go back to the repo root (in this case the system root), remove the git repo from it, create a folder inside the root directory, and symlink all files (using a script) to their appropriate places. I know it sounds a lot to read in one go, but it’ll be clear once you start doing it.

We’ll also go back to think that the system we moved “away” from in the first edition, we’re going back to it, *kind of*, through our custom script. A lot of utils exist in this space for the same purpose, but it’s kinda cool to have control over your stuff when you can generate it at your whim through AI.

We’re also gonna look at the sync mechanism now. First thought was to make an alias for syncing the repo + running the script as an alias, but now it makes more sense to sync the script in a post merge git hook to simplify things. That way I can add more setup/commands to it in the future if needed.

So after a few mins of Claude’s magic, I ended up in a state where I have one script, which maps eveything into it’s place each time after I pull changes. You can see more of the commit [here](https://github.com/xorforce/dotfiles/commit/2e984daeb1fb53df1ec71b03f3ea69218515aa55).

It’s nice that we make this substantial change so early on before we onboarded a lot of files, so we can verify changes easily and go on about it without changing too much things and on different machines. 

Let’s see if this setup also scales as we expect it to, and when we talk about the “prompt” in the next one.

Till then, happy hacking!
