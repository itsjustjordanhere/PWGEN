const pwGenBtn = document.getElementById("generatePasswordBtn");
const pwCopyBtn = document.getElementById("copyPasswordBtn");
const pwGenDisplay = document.getElementById("passwordDisplay");
const viewCode = document.getElementById("viewCode");
const displayCode = document.getElementById("displayCode");
const charSettings = {
    standard: 16,
    medium: 32,
    strong: 64,
    ultra: 128,
};

const charCheckBox = [
    {
        id: "standard",
        value: 16,
    },
    {
        id: "medium",
        value: 32,
    },
    {
        id: "strong",
        value: 64,
    },
    {
        id: "ultra",
        value: 128,
    },
];

window.onload = () => {
    displayCode.style.display = "none";
};

const getCharSettings = () => {
    let charSettings = 16;
    for (let i = 0; i < charCheckBox.length; i++) {
        if (document.getElementById(charCheckBox[i].id).checked) {
            charSettings = charCheckBox[i].value;
        }
    }
    return charSettings;
};

const radioBtns = document.querySelectorAll('input[type="radio"]');
for (let i = 0; i < radioBtns.length; i++) {
    radioBtns[i].addEventListener("change", function () {
        for (let j = 0; j < radioBtns.length; j++) {
            if (radioBtns[j] !== this) {
                radioBtns[j].checked = false;
            }
        }
    });
}

const generatePassword = () => {
    let charSettings = getCharSettings();
    let password = "";
    let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    for (let i = 0; i < charSettings; i++) {
        password += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return password;
};

pwGenBtn.addEventListener("click", () => {
    pwGenDisplay.textContent = generatePassword();
});

pwCopyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(pwGenDisplay.textContent);
    document.getElementById("tooltipSpan").style.visibility = "visible";
    document.getElementById("tooltipSpan").textContent = "Copied!";
    setTimeout(() => {
        document.getElementById("tooltipSpan").style.visibility = "hidden";
    }, 1000);
});

viewCode.addEventListener("click", () => {
    if (displayCode.style.display === "none") {
        displayCode.style.display = "block";
        viewCode.textContent = "Hide Code";
        displayCode.style.margin = "auto";
        displayCode.style.display = "flex";
        displayCode.style.justifyContent = "center";
    } else {
        displayCode.style.display = "none";
        viewCode.textContent = "View Code";
    }
});

pwGenBtn.addEventListener("click", () => {
    let i = 0;
    let txt = generatePassword();
    let speed = 40;
    document.getElementById("passwordDisplay").textContent = "";
    function typeWriter() {
        if (i < txt.length) {
            document.getElementById("passwordDisplay").textContent += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
});