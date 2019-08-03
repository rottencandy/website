---
title: "A new Web Interface for Retroshare"
date: 2019-05-23
draft: false
toc: false
images:
tags:
  - GSOC
  - Retroshare
  - Mithril
---

> This is a mirror of a [post](https://blog.freifunk.net/2019/05/23/a-new-web-interface-for-retroshare) I wrote on the [Freifunk blog](https://blog.freifunk.net).

The Retroshare communication platform already has a preliminary web interface.
But it is severely limited, supports only the basic of interactions with the client, and does not have the nice design and beautiful visual interface that the modern web platform makes possible.
This GSoC project will be about creating an entirely new web interface for Retroshare using it’s JSON API to handle all communication between the WebUI and the client.


## About Me

My name is Saud, I’m a third-year undergraduate student in Computer Science at Alliance University, Bangalore, India. This is my first time participating as a student in GSoC as well as my first time being involved in the Freifunk community.


## Project breifing

The Web Interface is planned to be made in such a way that all communication with the client happens through the JSON API. As such, It will be made using JavaScript.

The [Mithril](https://mithril.js.org) web framework has been chosen chosen for designing the front-end as well as handling the API calls.
Mithril is a very lightweight and fast client-side framework and is especially used for building single-page applications.
It also provides neatly integrated and customizable XHR capabilities out of the box.

The old Web UI communicates with the client app entirely through the deprecated libresapi.
The new UI will instead be using the JSON API for communication.
The JSON API has already been implemented using [Rapidjson](https://rapidjson.org).
This makes it relatively easier to add new API headers to extend the interface and support more functionality.

Apart from this, one more important thing to keep in mind is that the WebUI is planned to replace the old interface and hopefully be shipped along with the main Retroshare app.
And so it would make sense to keep dependencies to a minimum.
This app will have a development process different from typical modern web dev practices.
This app will not have dependencies(such as Nodejs), making it lightweight and able to easily integrate into the parent app’s build process.

A minimal working example has been implemented and can be seen in the source page.

Project source: https://github.com/RetroShare/RSNewWebUI

My fork: https://github.com/rottencandy/RSNewWebUI


## Overview

A brief overview of the main goals to be expected from the project:

- A “tab” system to display different sections of the Retroshare interface.
- Detailed and asynchronously updating tabs about file transfers, downloads, adding peers, internal statistics, etc.
- Options in the client app to enable and launch the WebUI.
- A config panel with detailed frames for viewing and changing as many configuration options as possible.
- Styled UI using CSS for a more sleek and beautiful look that adds to the visual appeal.
- Replace the old WebUI and disable libresapi on merge.

The web interface would be extremely beneficial to the community, allowing Retroshare to leverage the flexibility and approachability of the web.
It could be used by people who desire an alternate interface to Retroshare, for example, when using the nogui version,
or due to the traditional GUI client being too demanding on low spec hardware, or due to the OS having problems with Qt, etc.

Looking forward to an exciting summer working on this project. I will post more updates soon.
