const burnButton = document.querySelector(".burn-button");

const textarea = document.querySelector("textarea");

const body = document.querySelector("body");

const artifactWindow = document.querySelector(".artifact-window");

const crystal = document.querySelector(".crystal");

const keepButton = document.querySelector(".keep-button");

const destroyButton = document.querySelector(".destroy-button");

const artifactText = document.querySelector(".artifact-text");

const nothingRemains = document.querySelector(".nothing-remains");

let ritualComplete = false;

let currentCharm = "";

burnButton.addEventListener("click", function () {
    if (ritualComplete === true) {
        resetRitual();

        return;
    }

    const message = textarea.value.trim();

    if (message === "") {
        burnButton.textContent = "Type a spell first";

        setTimeout(function () {
            burnButton.textContent = "Burn Message";
        }, 1200);

        return;
    }

    currentCharm = generateCharm(message);

    crystal.textContent = currentCharm;

    textarea.classList.add("burning");

    body.classList.add("burn-mode");

    burnButton.textContent = "Casting...";

    burnButton.disabled = true;

    console.log("Burn ritual initiated.");

    setTimeout(function () {
        textarea.value = "";

        artifactText.textContent = "charm generated";

        artifactWindow.classList.remove("hidden");

        setTimeout(function () {
            artifactWindow.classList.add("artifact-visible");
        }, 50);

        burnButton.textContent = "Cast Again";

        burnButton.disabled = false;

        ritualComplete = true;

        console.log("Charm generated:", currentCharm);
    }, 3200);
});

keepButton.addEventListener("click", function () {
    if (currentCharm === "") {
        return;
    }

    copyCharmToClipboard(currentCharm);

    artifactText.textContent = "charm copied to pocket";

    keepButton.textContent = "Kept";

    console.log("Charm copied:", currentCharm);
});

destroyButton.addEventListener("click", function () {
    currentCharm = "";

    destroyButton.textContent = "Destroying...";

    keepButton.disabled = true;

    destroyButton.disabled = true;

    const artifactActions = document.querySelector(".artifact-actions");

    artifactActions.classList.add("actions-disappearing");

    crystal.classList.add("charm-destroying");

    setTimeout(function () {
        crystal.textContent = "";

        artifactText.style.opacity = "0";

        nothingRemains.classList.add("nothing-visible");
    }, 750);

    setTimeout(function () {
        nothingRemains.classList.remove("nothing-visible");

        nothingRemains.classList.add("nothing-fading");
    }, 3200);

    setTimeout(function () {
        artifactWindow.classList.remove("artifact-visible");

        artifactWindow.classList.add("hidden");

        crystal.classList.remove("charm-destroying");

        crystal.textContent = "◇";

        artifactText.style.opacity = "1";

        nothingRemains.classList.remove("nothing-fading");

        artifactActions.classList.remove("actions-disappearing");

        keepButton.textContent = "Keep";

        destroyButton.textContent = "Destroy";

        keepButton.disabled = false;

        destroyButton.disabled = false;

        burnButton.textContent = "Cast Again";
    }, 4300);

    console.log("Charm destroyed.");
});

function generateCharm(message) {
    const charms = [
        "◇",
        "◆",
        "✦",
        "✧",
        "✩",
        "☾",
        "☽",
        "♡",
        "♥",
        "♢",
        "𖤐",
        "🦋",
        "🐬",
        "🪄",
        "☁",
        "✺",
        "✹",
        "❂"
    ];

    let total = 0;

    for (let i = 0; i < message.length; i++) {
        total = total + message.charCodeAt(i);
    }

    const charmIndex = total % charms.length;

    return charms[charmIndex];
}

function copyCharmToClipboard(charm) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(charm).catch(function () {
            fallbackCopy(charm);
        });
    } else {
        fallbackCopy(charm);
    }
}

function fallbackCopy(text) {
    const temporaryInput = document.createElement("textarea");

    temporaryInput.value = text;

    document.body.appendChild(temporaryInput);

    temporaryInput.select();

    document.execCommand("copy");

    document.body.removeChild(temporaryInput);
}

function resetRitual() {
    textarea.value = "";

    textarea.classList.remove("burning");

    body.classList.remove("burn-mode");

    artifactWindow.classList.remove("artifact-visible");

    artifactWindow.classList.add("hidden");

    crystal.classList.remove("charm-destroying");

    crystal.textContent = "◇";

    artifactText.textContent = "charm generated";

    artifactText.style.opacity = "1";

    nothingRemains.classList.remove("nothing-visible");

    nothingRemains.classList.remove("nothing-fading");

    keepButton.textContent = "Keep";

    destroyButton.textContent = "Destroy";

    keepButton.disabled = false;

    destroyButton.disabled = false;

    burnButton.textContent = "Burn Message";

    currentCharm = "";

    ritualComplete = false;

    console.log("Ritual reset.");
}