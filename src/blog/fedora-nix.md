---
title: How to install nix on Fedora Workstation
description: When you want to have your cake and eat it too
date: 2023-10-24
---

I've been very satisfied with switching to [NixOS](https://nixos.org/) on my home systems recently,
so I decided to install nix(the package manager) on my work machine too, which runs Fedora.

Nix does everything in the `/nix` directory,
and Fedora comes with SELinux enabled by default.
SELinux does not like it when processes do too many things outside of the home directory.
This makes nix a bit tricky to get installed and running properly on Fedora.

The multi-user installer script available on [nixos.org/download](https://nixos.org/download) will not work
on a Fedora installation (at least during the time of writing this) for this reason.
There [is awareness](https://github.com/NixOS/nix/issues/2374) on this issue, and it's being worked on. But until a proper fix is available, we need to work around it by manually setting SELinux rules for everything inside `/nix`.

Thankfully, [dnkmmr69420](https://github.com/dnkmmr69420) has made a [really helpful guide](https://github.com/dnkmmr69420/nix-installer-scripts) to do exactly that, and even made a script that can do everything in a single command.
I usually don't recommend running random scripts from the internet without verifying them,
but you can alternatively follow step-by-step instructions [here](https://github.com/dnkmmr69420/nix-installer-scripts/blob/main/docs/selinux-nix-manual-install-guide.md) to do the same.
It essentially walks you through setting SELinux file conexts,
temporarily disable it to install nix, and then finish up by enabling it back.

After you're is done, you shuold have nix running on your system which you can confirm by running `nix --version`.

But we're not finished.

If you try to install and run any packages that use OpenGL/Vulkan libraries (which is pretty much all GUI applications),
you'll see a bunch of library errors and the application failing to launch.
This happens because nix uses paths different from the base OS to store libraries.
Normally nix ensures that packages have all available libs, but for GUI applications this is not possible since they can only use the OS libraries,
this ultimately fails as they don't find the required libs in the usual nix paths.

This is also [a well-known issue](https://github.com/NixOS/nixpkgs/issues/9415) and is being worked on.
The best solution at the moment is [nixGL](https://github.com/nix-community/nixGL), it makes sure packages have access to the correct libs needed to run GUI applications.
Follow the [instructions](https://github.com/nix-community/nixGL#installation) to install nixGL by adding the nix channel.

It can be used by wrapping over the command of the package you want to run.
For example, to run `obs` I would have to use `nixGLIntel obs`, use either `nixGLIntel` or `nixGLNvidia` depending on your hardware.
And Vulkan packages need to be run with `nixVulkanIntel` or `nixVulkanNvidia`.

That should be it, everything that's needed to have a fully functioning nix installation on Fedora.
