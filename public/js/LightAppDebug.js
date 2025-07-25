
const LightApp = {
    ///加载数据
    load:function(callBack){
        var arrs = [
            {ItemName:"caption",ItemId:"1",NoteId:"1"},
            {ItemName:"distance",ItemId:"1",NoteId:"1"},
            {ItemName:"abandon",ItemId:"1",NoteId:"1"},
            {ItemName:"hello world",ItemId:"1",NoteId:"1"},
            {ItemName:"handle",ItemId:"1",NoteId:"1"}
        ]
        
        callBack(arrs)
    },
    noteItem:{
        ///查询相关资料
        queryResItems:function(req,callBack){
            var arrs = [
                {
                    Content: "n.潮汐",
                    CreateTime: "2024-05-04 13:53:02",
                    ItemId: "13681d18-addd-451d-b483-e5732f62b926",
                    ItemName: "tide",
                    ResId: "79feb3d9-4369-41a1-b677-465c92d95a8c",
                    ResName: "释义",
                    ResType: "template",
                    Sort: "2",
                    UpdateTime: 1714801982
                },
                {
                    Content: "/əˈbændən/",
                    CreateTime: "2024-05-03 22:37:46",
                    ItemId: "d04f19fd-cca8-4ebb-a64c-3566a49b6ce3",
                    ItemName: "abandon",
                    ResId: "f3d4b124-1f40-4255-8630-fc1de8e7587c",
                    ResName: "音标",
                    ResType: "template",
                    Sort: "1",
                    UpdateTime: 1714747066
                },
                {
                    Content: ":ResName=潮汐\n:Play Roman vessels used to sail with the **tide** from Boulogne to Richborough.\n罗马的船只过去经常乘着潮汐从布洛涅航行到里奇伯勒。\n\n:ResName=潮汐\n:Play What causes the **tide**s?\n潮汐是什么引起的?\n\n:ResName=潮流\n:Play They talked of reversing the **tide** of history...\n他们谈到扭转历史潮流。\n\n:ResName=潮流\n:Play The sailors cast the boat off and allowed it to drift away on the **tide**.\n水手解下缆绳,任船随潮流漂走.\n\n:ResName=趋势\n:Play And the time we have to reverse this **tide** is running out.\n而我们扭转这一趋势的时间正在流逝.\n\n:ResName=趋势\n:Play Below the influence of this one **tide**, inferior also appeared the trend of economic area collectivize.\n在这一潮流的影响下, 东北亚也出现了经济区域集团化的趋势.\n\n:ResName=时机\n:Play A **tide** in the affairs of men which , taken at the flood , leads on to fortune.\n人生总有涨潮时, 把握时机, 便能功成名就.\n\n:ResName=时期\n:Play He sold his car to **tide** over his period of unemployment.\n他卖掉了汽车以渡过他失业的一段时期.\n\n:ResName=时期\n:Play Lystrosaurus may be Wadong and dormant, to help them **tide** over the Earth The worst period.\n也许水龙兽能够挖洞和冬眠, 从而帮助它们度过了地球上最恶劣的时期.",
                    CreateTime: "2024-05-04 16:07:05",
                    ItemId: "13681d18-addd-451d-b483-e5732f62b926",
                    ItemName: "tide",
                    ResId: "dd245def-a867-4ece-aeae-400b1b9d3da3",
                    ResName: "例句",
                    ResType: "template",
                    Sort: "3",
                    UpdateTime: 1714810025
                }
            ]

            callBack(arrs)


        },
        ///更改项目颜色
        updateItemColor:function(param,callBack){
            callBack({ok:true})
        }
    },
    sound:{
        ///播放文本
        playText:function(text,playerName,speed,callBack){
            console.log("播放内容",text,playerName,speed)
            callBack()
        }
    },
    ///配置项读写
    config:{
        ///写入配置
        writeConfig:function(name,config,callBack){
            callBack()
        },
        ///读取配置
        readConfig:function(name,callBack){
            callBack(null)
        }
    },
    ///学习相关
    learn:{
        ///获取复习选项
        getReviewOptions:function(param,callBack){
            var options = [
                { name: "重来", key: "again", color: "var(--review1)", tip: "" },
                { name: "困难", key: "bad", color: "var(--review1)", tip: "" },
                { name: "良好", key: "good", color: "var(--review2)", tip: "" },
                { name: "简单", key: "easy", color: "var(--review3)", tip: "" },
                { name: "已掌握", key: "master", color: "var(--review4)", tip: "掌握" }
            ]
            var res = {
                reviewType:"fsrs",
                options:options
            }
            callBack(res)
        },
        ///复习项目
        reviewItem:function(param,callBack){
            var resp = {remove:true,message:"下次复习 - 5分钟后"}
            callBack(resp)
        },
        ///计算复习时间
        calcReviewTime:function(param,callBack){
            var results = [
                {
                    key: "again",
                    showTime: "1分钟后"
                },
                {
                    key:"bad",
                    showTime:"5分钟后"
                },
                {
                    key:"good",
                    showTime:"30分钟后"
                },
                {
                    key:"easy",
                    showTime:"4天后"
                }
            ]
            callBack(results)
        }
    },
}

