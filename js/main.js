(function () {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'bottom',
        },
        types: [
            {
                type: 'success',
                background: 'green',
                className: "notyf__toast--success",

                dismissible: true,
                icon: false
            },
            {
                type: 'warning',
                background: 'orange',
                className: "notyf__toast--warning",
                dismissible: true,
                icon: false
            },
            {
                type: 'error',
                background: 'indianred',
                className: "notyf__toast--error",
                dismissible: true,
                icon: false
            },
            {
                type: 'info',
                background: '#2196f3',
                className: "notyf__toast--info",
                dismissible: true,
                icon: false
            }
        ]
    });

    const avatarContainer = document.querySelector(".avatar-container");
    const searchBtn = document.querySelector(".search-button");
    const uidInput = document.querySelector(".uid-input");
    const serverSelect = document.querySelector(".server-select");

    searchBtn.addEventListener("click", function () {
        if (!searchBtn.classList.contains("disabled")) {
            let uid = uidInput.value.trim();
            let server = serverSelect.value;
            if (uid == "") {
                notyf.open({
                    type: 'error',
                    message: "未输入玩家uid"
                });
            } else {
                searchBtn.classList.add("disabled");
                notyf.open({
                    type: 'info',
                    message: "获取中，请稍后..."
                });
                fetch(`https://api.daidr.me/apis/genshinUserinfo?uid=${uid}&server=${server}`)
                    .then(result => result.json())
                    .then(result => {
                        if (result["retcode"] !== 0) {
                            notyf.open({
                                type: 'error',
                                message: "错误：" + result["message"]
                            });
                            avatarContainer.classList.add("invisible");
                        } else {
                            avatarContainer.innerHTML = "";
                            let html = "";
                            for (let i = 0; i < result["data"]["avatars"].length; i++) {
                                html += `<avatar-card image="${result["data"]["avatars"][i]["image"]}" name="${result["data"]["avatars"][i]["name"]}" element="${result["data"]["avatars"][i]["element"]}" fetter="${result["data"]["avatars"][i]["fetter"]}" level="${result["data"]["avatars"][i]["level"]}" rarity="${result["data"]["avatars"][i]["rarity"]}" class="content"></avatar-card>`;
                            }
                            avatarContainer.innerHTML = html;
                            avatarContainer.classList.remove("invisible");
                            notyf.open({
                                type: 'success',
                                message: "玩家信息获取成功"
                            });
                        }

                        searchBtn.classList.remove("disabled");
                    })
                    .catch(e => {
                        notyf.open({
                            type: 'error',
                            message: "信息获取失败，请重试"
                        });
                        avatarContainer.classList.add("invisible");
                        searchBtn.classList.remove("disabled");
                    })
            }
        }
    })
})()