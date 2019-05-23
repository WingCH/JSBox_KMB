# Siri shortcut / JSBox 九巴到站時間

因為每天早上回學都需要用KMB Apps查巴士到站時間，首先要尋找和打開KMB Apps，另外還要閉關廣告和輸入巴士號搜尋，過程需時，最近iOS推出了Siri shortcut(之前的Workflow)，更可以在Apple watch使用，所以心血來潮想玩一下。


1. 取得九巴的到站時間Api
2. 利用Siri shortcut取得巴士到站時間
    1. 使用JSbox實現相同的功能

# 取得九巴的到站時間Api

> 本來打算在網頁版的[九巴到站時間](http://search.kmb.hk/KMBWebSite/index.aspx?lang=tc)利用抓包工具[Charles](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=2ahUKEwjg3NnTodvdAhVC62EKHcstBtcQFjAAegQICRAB&url=https%3A%2F%2Fwww.charlesproxy.com%2F&usg=AOvVaw0NQY3-KxOagyLymUCR6n1J)取得到站時間的資料，誰知道找不到完整的REST API，可能是功力不夠吧😂😂

![](http://notes.wingpage.net/media/15380507923034/15380544998427.jpg)


> 然後就嘗試在九巴的手機Apps入手，這次成功利用抓包工具Surge取得完整的REST API和到站時間的資料（也可以用[Stream](https://itunes.apple.com/hk/app/stream/id1312141691?mt=8) 這個不用錢）

![IMG_0CD3494CF9BD-1](http://notes.wingpage.net/media/15380507923034/IMG_0CD3494CF9BD-1.png)


> REST API

```url
http://etav3.kmb.hk/?action=geteta&lang=tc&route=35A&bound=1&stop=WO04S13000&stop_seq=4&servicetype=01
```


| Name | Value |  |
| :-: | :-: | :-: |
| action | geteta |  |
| lang | tc | 繁中 |
| route | 35A | 巴士號碼 |
| bound | 1 | 方向 |
| stop | WO04S13000 | ***可以不用** |
| stop_seq | 4 | 第幾個站 (0開始) |
| servicetype | 01 |  |

> 這是35A第五個站的到站數據
> 很多我也不知道是什麼意思，但Apps的到站時間是根據`t`來計算的

```json
//response
{
  "responsecode": 0,
  "response": [
    {
      "w": "Y",
      "ex": "2018-09-27 21:59:41",
      "eot": "E",
      "t": "21:58",
      "ei": "Y",
      "bus_service_type": 1,
      "wifi": "Y",
      "ol": "E"
    },
    {
      "w": "Y",
      "ex": "2018-09-27 22:19:32",
      "eot": "T",
      "t": "22:19　預定班次",
      "ei": "Y",
      "bus_service_type": 1,
      "wifi": "Y",
      "ol": "N"
    },
    {
      "w": "Y",
      "ex": "2018-09-27 22:44:29",
      "eot": "T",
      "t": "22:43　預定班次",
      "ei": "Y",
      "bus_service_type": 1,
      "wifi": "Y",
      "ol": "N"
    }
  ],
  "generated": 1538055891894,
  "updated": 1538055859000
}
```

# 利用Siri shortcut取得巴士到站時間

> 35A到站時間：https://www.icloud.com/shortcuts/114f6e29821f4663b0eab49d9c3fb2ce

![-c511](http://notes.wingpage.net/media/15380507923034/15382159233915.jpg)

> 加入Siri

![-w1125](http://notes.wingpage.net/media/15380507923034/15382167002461.jpg)


-------

# 實驗

> Siri的廣東話識別真是差💩💩💩

![IMB_olIbd9 -c](http://notes.wingpage.net/media/15380507923034/IMB_olIbd9.gif)



-------
# 使用JSbox實現相同的功能

[JSBox](https://docs.xteko.com/#/)是類似Siri Shortcut的神器，可以實現比Siri Shortcut更多的功能，詳情可以搜一下

> 腳本分享 : [KMB_ArrivalTime.js](https://xteko.com/redir?name=KMB到站時間&url=https://raw.githubusercontent.com/WingCH/JSBox_KMB/master/KMB_ArrivalTime.js&icon=icon_087&author=WingCH)

![IMB_QI5VEF -c](http://notes.wingpage.net/media/15380507923034/IMB_QI5VEF.gif)
