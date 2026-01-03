/*
 * Vencord, a Discord client mod
 * Copyright (c) 2023 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./style.css";

import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { Forms } from "@webpack/common";

const settings = definePluginSettings({
    platform: {
        type: OptionType.SELECT,
        description: "What platform to show up as on",
        restartNeeded: true,
        options: [
            {
                label: "Desktop",
                value: "desktop",
                default: true,
            },
            {
                label: "Web",
                value: "web",
            },
            {
                label: "Mobile",
                value: "mobile",
            },
            {
                label: "Embedded (Console)",
                value: "embedded",
            },
        ]
    }
});

export default definePlugin({
    name: "Platform Spoofer",
    description: "Spoof what platform or device you're on",
    authors: [{ name: "verfired", id: 1362177941882142923n }],
    settingsAboutComponent: () => <>
        <Forms.FormText className="platform-warning">
        Bu plugin nedeniyle uyarı almayacağınızı veya banlanmayacağınızı garanti edemem.
        </Forms.FormText>
    </>,
    settings: settings,
    patches: [
        {
            find: "_doIdentify(){",
            replacement: {
                match: /(\[IDENTIFY\].*let.{0,5}=\{.*properties:)(.*),presence/,
                replace: "$1{...$2,...$self.getPlatform()},presence"
            }
        }
    ],
    getPlatform: () => {
        switch (settings.store.platform ?? "desktop") {
            case "desktop":
                return { browser: "Discord Client" };
            case "web":
                return { browser: "Chrome" };
            case "mobile":
                return { browser: "Discord iOS" };
            case "embedded":
                return { browser: "Discord Embedded" };
        }

    }
});
