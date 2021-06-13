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

    const statsContainer = document.querySelector(".stats-container");
    const avatarContainer = document.querySelector(".avatar-container");
    const worldContainer = document.querySelector(".world-container");
    const homesContainer = document.querySelector(".homes-container");
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
                            statsContainer.classList.add("invisible");
                            worldContainer.classList.add("invisible");
                        } else {
                            // 获得角色展示板块
                            avatarContainer.innerHTML = "";
                            let html = "";
                            for (let i = 0; i < result["data"]["avatars"].length; i++) {
                                html += `<avatar-card image="${result["data"]["avatars"][i]["image"]}" name="${result["data"]["avatars"][i]["name"]}" actived_constellation_num="${result["data"]["avatars"][i]["actived_constellation_num"]}" element="${result["data"]["avatars"][i]["element"]}" fetter="${result["data"]["avatars"][i]["fetter"]}" level="${result["data"]["avatars"][i]["level"]}" rarity="${result["data"]["avatars"][i]["rarity"]}" class="content"></avatar-card>`;
                            }
                            avatarContainer.innerHTML = html;

                            // 数据统计展示板块
                            document.querySelector(".data-1").innerText = result["data"]["stats"]["active_day_number"];
                            document.querySelector(".data-2").innerText = result["data"]["stats"]["achievement_number"];
                            document.querySelector(".data-3").innerText = result["data"]["stats"]["anemoculus_number"];
                            document.querySelector(".data-4").innerText = result["data"]["stats"]["geoculus_number"];
                            document.querySelector(".data-5").innerText = result["data"]["stats"]["avatar_number"];
                            document.querySelector(".data-6").innerText = result["data"]["stats"]["way_point_number"];
                            document.querySelector(".data-7").innerText = result["data"]["stats"]["domain_number"];
                            document.querySelector(".data-8").innerText = result["data"]["stats"]["spiral_abyss"];
                            document.querySelector(".data-9").innerText = result["data"]["stats"]["luxurious_chest_number"];
                            document.querySelector(".data-10").innerText = result["data"]["stats"]["precious_chest_number"];
                            document.querySelector(".data-11").innerText = result["data"]["stats"]["exquisite_chest_number"];
                            document.querySelector(".data-12").innerText = result["data"]["stats"]["common_chest_number"];

                            // 大世界数据展示板块
                            worldContainer.innerHTML = "";
                            html = "";
                            for (let i = 0; i < result["data"]["world_explorations"].length; i++) {
                                html += `<world-card icon="${result["data"]["world_explorations"][i]["icon"]}" name="${result["data"]["world_explorations"][i]["name"]}" type="${result["data"]["world_explorations"][i]["type"]}" exploration_percentage="${result["data"]["world_explorations"][i]["exploration_percentage"]}" level="${result["data"]["world_explorations"][i]["level"]}" class="content"></world-card>`;
                            }
                            worldContainer.innerHTML = html;

                            // 尘歌壶数据统计展示板块
                            homesContainer.innerHTML = "";
                            html = "";
                            try {
                                for (let i = 0; i < result["data"]["world_explorations"].length; i++) {
                                    html = `<div class='home-container' style='background-image:url(${result["data"]["homes"][i]["icon"]});'>
                                        <div class="homecard-row-1">
                                            <div class="comfort-level">
                                                <div class="comfort-level-icon" style='background-image:url(${result["data"]["homes"][i]["comfort_level_icon"]});'></div>
                                                <span class="comfort-level-name">${result["data"]["homes"][i]["comfort_level_name"]}</span>
                                            </div>
                                            <div class="home-name">${result["data"]["homes"][i]["name"]}</div>
                                        </div>
                                        <div class="homecard-row-2">
                                            <div class="homestats-item">
                                                <p class="homestats-data">${result["data"]["homes"][i]["level"]}</p>
                                                <p class="homestats-title">信任等阶</p>
                                            </div>
                                            <div class="homestats-item">
                                                <p class="homestats-data">${result["data"]["homes"][i]["comfort_num"]}</p>
                                                <p class="homestats-title">洞天仙力</p>
                                            </div>
                                            <div class="homestats-item">
                                                <p class="homestats-data">${result["data"]["homes"][i]["item_num"]}</p>
                                                <p class="homestats-title">摆件数</p>
                                            </div>
                                            <div class="homestats-item">
                                                <p class="homestats-data">${result["data"]["homes"][i]["visit_num"]}</p>
                                                <p class="homestats-title">访客数</p>
                                            </div>
                                        </div>
                                    </div>`
                                }
                                
                            } catch (e) {
                                
                            }
                            homesContainer.innerHTML = html;


                            avatarContainer.classList.remove("invisible");
                            statsContainer.classList.remove("invisible");
                            worldContainer.classList.remove("invisible");
                            homesContainer.classList.remove("invisible");
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
                        statsContainer.classList.add("invisible");
                        worldContainer.classList.add("invisible");
                        searchBtn.classList.remove("disabled");
                    })
            }
        }
    })
})()
