---
title: Linux on the Lenovo Yoga Pro 7
description: Things to do after installing linux on the Lenovo Yoga Pro 7 AMD Gen 9
date: 2025-07-03
page_cover: img/lenovo-yoga-pro-7/laptop.jpg
---

![Image of the laptop](/img/lenovo-yoga-pro-7/laptop.jpg)

I got the Lenovo Yoga Pro 7 (gen 9) AMD version for work. It's incredibly fast due to AMD's new Strix Point architecture and I love using it.
Obviously, installing linux was a breeze compared to my previous device that had nvidia hardware.

But I still had to make a few minor tweaks to fix a bunch of "quirks" in order to set it up to my liking,
so here they are in case it helps anyone.

## Power profiles

There's a good change that any popular linux distro you install comes with `power-profiles-daemon` installed that allows setting one of the three predefined CPU power profiles (power, balanced, performance).
And they should even automatically switch based on charging states.

But it's too barebones for my tastes, so I installed [TLP](https://linrunner.de/tlp/index.html) instead, which is a lot more powerful and has more options for fine-grained control. Here's an example config to match power-profiles-daemon's behavior: [https://linrunner.de/tlp/faq/ppd.html#how-can-i-use-tlp-to-achieve-the-same-effect-as-power-profiles-daemon](https://linrunner.de/tlp/faq/ppd.html#how-can-i-use-tlp-to-achieve-the-same-effect-as-power-profiles-daemon)

Note that TLP and power-profiles-daemon conflict with each other so to use one you have to uninstall the other.

## Charge threshold

Setting up a charging limit is one of the first things I do all my devices, Thankfully TLP's charge threshold works out of the box almost perfectly.

The only caveat, it can go only upto 80% capacity. And from what I could gather, it's baked into the firmware so I couldn't go lower. It's something I can live with, but still worth noting.

## Power button

The only design flaw of this device for me (apart from the disgusting copilot button).

It's so stupid, the laptop's power button is placed on the side, _exactly_ where you would normally hold the laptop.
And is light enough to be accidentally pressed very easily.

I highly recommend disabling it while the device is on. All you need to do is add the following to `/etc/systemd/logind.conf`:

```
HandlePowerKey=ignore
```

For nixOS, put it in `services.logind.extraConfig`.

And that should disable it.

Here's my full nixOS config for the device: [https://github.com/rottencandy/nixfiles/blob/main/hosts/kitsune/configuration.nix](https://github.com/rottencandy/nixfiles/blob/main/hosts/kitsune/configuration.nix)
