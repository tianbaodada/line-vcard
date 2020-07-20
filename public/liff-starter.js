window.onload = function() {
    const useNodeJS = true;   // if you are not using a node server, set this value to false
    const defaultLiffId = "";   // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let myLiffId = "";

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                document.getElementById("liffAppContent").classList.add('hidden');
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};

const msg = {
    "type": "flex",
    "altText": "這是我的名片",
    "contents": {
        "type": "bubble",
        "size": "giga",
        "body": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
                {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "孟天寶",
                                    "size": "md",
                                    "align": "center",
                                    "weight": "bold"
                                },
                                {
                                    "type": "text",
                                    "text": "中區業務主任",
                                    "size": "xxs",
                                    "align": "center"
                                },
                                {
                                    "type": "text",
                                    "text": "0929-544-828",
                                    "size": "xs",
                                    "align": "center"
                                }
                            ],
                            "paddingBottom": "14px",
                            "action": {
                                "type": "uri",
                                "label": "action",
                                "uri": "tel:0929-544-828"
                            }
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "image",
                                    "url": "https://i.imgur.com/90nr9Gw.png",
                                    "size": "md",
                                    "align": "center",
                                    "aspectRatio": "21:9"
                                },
                                {
                                    "type": "text",
                                    "text": "義大利馬貝總代理",
                                    "align": "center",
                                    "size": "xxs"
                                }
                            ],
                            "action": {
                                "type": "uri",
                                "label": "action",
                                "uri": "https://www.mapei.com/sg/en/home-page"
                            }
                        }
                    ]
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "璉紅實業有限公司",
                            "action": {
                                "type": "uri",
                                "label": "action",
                                "uri": "http://landhome.com.tw/"
                            },
                            "weight": "bold"
                        },
                        {
                            "type": "text",
                            "text": "台北市信義區\n中坡北路15巷11號1F",
                            "size": "xs",
                            "action": {
                                "type": "uri",
                                "label": "action",
                                "uri": "https://www.google.com/maps/search/?api=1&query=%E7%92%89%E7%B4%85%E5%AF%A6%E6%A5%AD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&query_place_id=ChIJDSF-kJ-rQjQRUx-6uKwPUCs"
                            },
                            "decoration": "underline",
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": "TEL: 02-8785-8856",
                            "size": "xs",
                            "action": {
                                "type": "uri",
                                "label": "action",
                                "uri": "tel:02-8785-8856"
                            }
                        },
                        {
                            "type": "text",
                            "text": "FAX: 02-8785-8860",
                            "size": "xs"
                        },
                        {
                            "type": "text",
                            "text": "E-mail: lh@landhome.com.tw",
                            "size": "xs",
                            "action": {
                                "type": "uri",
                                "label": "action",
                                "uri": "mailto:lh@landhome.com.tw"
                            }
                        },
                        {
                            "type": "text",
                            "text": "統一編號: 12691134",
                            "size": "xs"
                        }
                    ]
                }
            ]
        }
    }
};

/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("liffAppContent").classList.add('hidden');
        document.getElementById("liffIdErrorMessage").classList.remove('hidden');
    } else {
        initializeLiff(myLiffId);
    }
}

/**
* Initialize LIFF
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            document.getElementById("liffAppContent").classList.add('hidden');
            document.getElementById("liffInitErrorMessage").classList.remove('hidden');
            console.log(err);
        });
}

/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    displayLiffData();
    displayIsInClientInfo();
    registerButtonHandlers();

    // check if the user is logged in/out, and disable inappropriate button
    if (liff.isLoggedIn()) {
        document.getElementById('liffLoginButton').disabled = true;
    } else {
        document.getElementById('liffLogoutButton').disabled = true;
    }
}

/**
* Display data generated by invoking LIFF methods
*/
function displayLiffData() {
    document.getElementById('browserLanguage').textContent = liff.getLanguage();
    document.getElementById('sdkVersion').textContent = liff.getVersion();
    document.getElementById('lineVersion').textContent = liff.getLineVersion();
    document.getElementById('isInClient').textContent = liff.isInClient();
    document.getElementById('isLoggedIn').textContent = liff.isLoggedIn();
    document.getElementById('deviceOS').textContent = liff.getOS();
}

/**
* Toggle the login/logout buttons based on the isInClient status, and display a message accordingly
*/
function displayIsInClientInfo() {
    if (liff.isInClient()) {
        document.getElementById('liffLoginButton').classList.toggle('hidden');
        document.getElementById('liffLogoutButton').classList.toggle('hidden');
        document.getElementById('isInClientMessage').textContent = 'You are opening the app in the in-app browser of LINE.';
    } else {
        document.getElementById('isInClientMessage').textContent = 'You are opening the app in an external browser.';
    }
}

/**
* Register event handlers for the buttons displayed in the app
*/
function registerButtonHandlers() {
    // openWindow call
    // document.getElementById('openWindowButton').addEventListener('click', function() {
    //     liff.openWindow({
    //         url: 'https://line.me',
    //         external: true
    //     });
    // });

    // closeWindow call
    document.getElementById('closeWindowButton').addEventListener('click', function() {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.closeWindow();
        }
    });

    // sendMessages call
    document.getElementById('sendMessageButton').addEventListener('click', function() {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.sendMessages([msg]).then(function() {
                window.alert('Message sent');
            }).catch(function(error) {
                window.alert('Error sending message: ' + error);
            });
        }
    });

    // scanCode call
    // document.getElementById('scanQrCodeButton').addEventListener('click', function() {
    //     if (!liff.isInClient()) {
    //         sendAlertIfNotInClient();
    //     } else {
    //         liff.scanCode().then(result => {
    //             // e.g. result = { value: "Hello LIFF app!" }
    //             const stringifiedResult = JSON.stringify(result);
    //             document.getElementById('scanQrField').textContent = stringifiedResult;
    //             toggleQrCodeReader();
    //         }).catch(err => {
    //             document.getElementById('scanQrField').textContent = "scanCode failed!";
    //         });
    //     }
    // });

    // get access token
    // document.getElementById('getAccessToken').addEventListener('click', function() {
    //     if (!liff.isLoggedIn() && !liff.isInClient()) {
    //         alert('To get an access token, you need to be logged in. Please tap the "login" button below and try again.');
    //     } else {
    //         const accessToken = liff.getAccessToken();
    //         document.getElementById('accessTokenField').textContent = accessToken;
    //         toggleAccessToken();
    //     }
    // });

    // get profile call
    // document.getElementById('getProfileButton').addEventListener('click', function() {
    //     liff.getProfile().then(function(profile) {
    //         document.getElementById('userIdProfileField').textContent = profile.userId;
    //         document.getElementById('displayNameField').textContent = profile.displayName;

    //         const profilePictureDiv = document.getElementById('profilePictureDiv');
    //         if (profilePictureDiv.firstElementChild) {
    //             profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
    //         }
    //         const img = document.createElement('img');
    //         img.src = profile.pictureUrl;
    //         img.alt = 'Profile Picture';
    //         profilePictureDiv.appendChild(img);

    //         document.getElementById('statusMessageField').textContent = profile.statusMessage;
    //         toggleProfileData();
    //     }).catch(function(error) {
    //         window.alert('Error getting profile: ' + error);
    //     });
    // });

    document.getElementById('shareTargetPicker').addEventListener('click', function() {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            if (liff.isApiAvailable('shareTargetPicker')) {
                liff.shareTargetPicker([msg])
                    .then(
                        document.getElementById('shareTargetPickerMessage').textContent = "Share target picker was launched."
                    ).catch(function(res) {
                        document.getElementById('shareTargetPickerMessage').textContent = "Failed to launch share target picker.";
                    });
            }
        }
    });

    // login call, only when external browser is used
    document.getElementById('liffLoginButton').addEventListener('click', function() {
        if (!liff.isLoggedIn()) {
            // set `redirectUri` to redirect the user to a URL other than the front page of your LIFF app.
            liff.login();
        }
    });

    // logout call only when external browse
    document.getElementById('liffLogoutButton').addEventListener('click', function() {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });
}

/**
* Alert the user if LIFF is opened in an external browser and unavailable buttons are tapped
*/
function sendAlertIfNotInClient() {
    alert('This button is unavailable as LIFF is currently being opened in an external browser.');
}

/**
* Toggle access token data field
*/
function toggleAccessToken() {
    toggleElement('accessTokenData');
}

/**
* Toggle profile info field
*/
function toggleProfileData() {
    toggleElement('profileInfo');
}

/**
* Toggle scanCode result field
*/
function toggleQrCodeReader() {
    toggleElement('scanQr');
}

/**
* Toggle specified element
* @param {string} elementId The ID of the selected element
*/
function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = 'none';
    } else {
        elem.style.display = 'block';
    }
}
