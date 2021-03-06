var UIVideoPlayerTest = UIMainLayer.extend({

    onEnter: function(){
        UIMainLayer.prototype.onEnter.call(this);

        var video = new ccui.VideoPlayer("cocosvideo.mp4");
        video.setContentSize(320, 240);
        video.setPosition(800/2, 450/2);
        video.setScale(0.5);
        window.video = video;
        this.addChild(video);

        var widgetSize = this._widget.getContentSize();
        var playState = this._topDisplayLabel;
        playState.setString("Press buttons to start");
        playState.y = widgetSize.height / 2.0 + playState.height * 1.5;
        this._bottomDisplayLabel.setString("");

        var list = [
            { name: "playURL", func: function(){
                playState.setString("Video from Web address");
                video.setURL("http://benchmark.cocos2d-x.org/cocosvideo.mp4");
                video.play();
            }},
            { name: "PlayLocal", func: function(){
                playState.setString("Video from Local resource");
                video.setURL("cocosvideo.mp4");
                video.play();
            }},
            { name: "Pause", func: function(){
                playState.setString("Pause playing");
                video.pause();
            }},
            { name: "Resume", func: function(){
                playState.setString("Resume");
                video.resume();
            }},
            { name: "Stop", func: function(){
                playState.setString("Stop playing");
                video.stop();
            }},
            { name: "SeekTo", func: function(){
                var sec = ((Math.random() * 59) * 100 | 0) / 100;
                playState.setString("SeekTo %f sec", sec);
                video.seekTo(sec);
            }},
            { name: "Full Screen", func: function(){
                playState.setString("setFullScreenEnabled");
                video.setFullScreenEnabled(true);
            }},
            { name: "Scale", func: function(){
                var scale = ((Math.random() * 0.5 + 0.2) * 100 | 0) / 100;
                playState.setString( "setScale(%f)!" );
                video.setScale(scale);
            }},
            { name: "setAnchorPoint", func: function(){
                var anpX = video.getAnchorPoint().x === 1 ? 0: video.getAnchorPoint().x+ 0.5;
                var anpY = video.getAnchorPoint().y === 1 ? 0: video.getAnchorPoint().y+ 0.5;
                video.setAnchorPoint(anpX, anpY);
            }}
        ];

        var layer = this;
        list.forEach(function(item, i){
            var button = new ccui.Button();
            i+1 !== list.length ? button.setScale(1.3) : button.setScale(1);
            button.setPosition( 140 + (i / 5 | 0) * 530, 320 - (i % 5) * 50);
            button.setTitleText(item.name);
            button.setTitleColor(cc.color.YELLOW);
            button.setZoomScale(0.3);
            button.setPressedActionEnabled(true);
            button.addClickEventListener(item.func);
            layer.addChild(button);
        });

    }

});