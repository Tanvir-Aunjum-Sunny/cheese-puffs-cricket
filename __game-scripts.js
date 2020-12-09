pc.extend(pc,function(){var t=function(t){this._app=t,this._tweens=[],this._add=[]};t.prototype={add:function(t){return this._add.push(t),t},update:function(t){for(var i=0,e=this._tweens.length;i<e;)this._tweens[i].update(t)?i++:(this._tweens.splice(i,1),e--);this._add.length&&(this._tweens=this._tweens.concat(this._add),this._add.length=0)}};var i=function(t,i,e){pc.events.attach(this),this.manager=i,e&&(this.entity=null),this.time=0,this.complete=!1,this.playing=!1,this.stopped=!0,this.pending=!1,this.target=t,this.duration=0,this._currentDelay=0,this.timeScale=1,this._reverse=!1,this._delay=0,this._yoyo=!1,this._count=0,this._numRepeats=0,this._repeatDelay=0,this._from=!1,this._slerp=!1,this._fromQuat=new pc.Quat,this._toQuat=new pc.Quat,this._quat=new pc.Quat,this.easing=pc.EASE_LINEAR,this._sv={},this._ev={}},e=function(t){var i;return t instanceof pc.Vec2?i={x:t.x,y:t.y}:t instanceof pc.Vec3?i={x:t.x,y:t.y,z:t.z}:t instanceof pc.Vec4?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Quat?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Color?(i={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(i.a=t.a)):i=t,i};i.prototype={to:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this},from:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this._from=!0,this},rotate:function(t,i,n,s,r,h){return this._properties=e(t),this.duration=i,n&&(this.easing=n),s&&this.delay(s),r&&this.repeat(r),h&&this.yoyo(h),this._slerp=!0,this},start:function(){var t,i,e,n;if(this.playing=!0,this.complete=!1,this.stopped=!1,this._count=0,this.pending=this._delay>0,this._reverse&&!this.pending?this.time=this.duration:this.time=0,this._from){for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this._properties[t],this._ev[t]=this.target[t]);this._slerp&&(this._toQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._fromQuat.setFromEulerAngles(i,e,n))}else{for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this.target[t],this._ev[t]=this._properties[t]);this._slerp&&(this._fromQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._toQuat.setFromEulerAngles(i,e,n))}return this._currentDelay=this._delay,this.manager.add(this),this},pause:function(){this.playing=!1},resume:function(){this.playing=!0},stop:function(){this.playing=!1,this.stopped=!0},delay:function(t){return this._delay=t,this.pending=!0,this},repeat:function(t,i){return this._count=0,this._numRepeats=t,this._repeatDelay=i||0,this},loop:function(t){return t?(this._count=0,this._numRepeats=1/0):this._numRepeats=0,this},yoyo:function(t){return this._yoyo=t,this},reverse:function(){return this._reverse=!this._reverse,this},chain:function(){for(var t=arguments.length;t--;)t>0?arguments[t-1]._chained=arguments[t]:this._chained=arguments[t];return this},update:function(t){if(this.stopped)return!1;if(!this.playing)return!0;if(!this._reverse||this.pending?this.time+=t*this.timeScale:this.time-=t*this.timeScale,this.pending){if(!(this.time>this._currentDelay))return!0;this._reverse?this.time=this.duration-(this.time-this._currentDelay):this.time=this.time-this._currentDelay,this.pending=!1}var i=0;(!this._reverse&&this.time>this.duration||this._reverse&&this.time<0)&&(this._count++,this.complete=!0,this.playing=!1,this._reverse?(i=this.duration-this.time,this.time=0):(i=this.time-this.duration,this.time=this.duration));var e,n,s=this.time/this.duration,r=this.easing(s);for(var h in this._properties)this._properties.hasOwnProperty(h)&&(e=this._sv[h],n=this._ev[h],this.target[h]=e+(n-e)*r);if(this._slerp&&this._quat.slerp(this._fromQuat,this._toQuat,r),this.entity&&(this.entity._dirtifyLocal(),this.element&&this.entity.element&&(this.entity.element[this.element]=this.target),this._slerp&&this.entity.setLocalRotation(this._quat)),this.fire("update",t),this.complete){var a=this._repeat(i);return a?this.fire("loop"):(this.fire("complete",i),this._chained&&this._chained.start()),a}return!0},_repeat:function(t){if(this._count<this._numRepeats){if(this._reverse?this.time=this.duration-t:this.time=t,this.complete=!1,this.playing=!0,this._currentDelay=this._repeatDelay,this.pending=!0,this._yoyo){for(var i in this._properties)tmp=this._sv[i],this._sv[i]=this._ev[i],this._ev[i]=tmp;this._slerp&&(this._quat.copy(this._fromQuat),this._fromQuat.copy(this._toQuat),this._toQuat.copy(this._quat))}return!0}return!1}};var n=function(t){return 1-s(1-t)},s=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375};return{TweenManager:t,Tween:i,Linear:function(t){return t},QuadraticIn:function(t){return t*t},QuadraticOut:function(t){return t*(2-t)},QuadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},CubicIn:function(t){return t*t*t},CubicOut:function(t){return--t*t*t+1},CubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},QuarticIn:function(t){return t*t*t*t},QuarticOut:function(t){return 1- --t*t*t*t},QuarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},QuinticIn:function(t){return t*t*t*t*t},QuinticOut:function(t){return--t*t*t*t*t+1},QuinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},SineIn:function(t){return 0===t?0:1===t?1:1-Math.cos(t*Math.PI/2)},SineOut:function(t){return 0===t?0:1===t?1:Math.sin(t*Math.PI/2)},SineInOut:function(t){return 0===t?0:1===t?1:.5*(1-Math.cos(Math.PI*t))},ExponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},ExponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},ExponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},CircularIn:function(t){return 1-Math.sqrt(1-t*t)},CircularOut:function(t){return Math.sqrt(1- --t*t)},CircularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){return t*t*(2.70158*t-1.70158)},BackOut:function(t){return--t*t*(2.70158*t+1.70158)+1},BackInOut:function(t){var i=2.5949095;return(t*=2)<1?t*t*((i+1)*t-i)*.5:.5*((t-=2)*t*((i+1)*t+i)+2)},BounceIn:n,BounceOut:s,BounceInOut:function(t){return t<.5?.5*n(2*t):.5*s(2*t-1)+.5},ElasticIn:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),-e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4))},ElasticOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),e*Math.pow(2,-10*t)*Math.sin((t-i)*(2*Math.PI)/.4)+1)},ElasticInOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),(t*=2)<1?e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*-.5:e*Math.pow(2,-10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*.5+1)}}}()),function(){pc.Application.prototype.addTweenManager=function(){this._tweenManager=new pc.TweenManager(this),this.on("update",function(t){this._tweenManager.update(t)})},pc.Application.prototype.tween=function(t){return new pc.Tween(t,this._tweenManager)},pc.Entity.prototype.tween=function(t,i){var e=this._app.tween(t);return e.entity=this,this.on("destroy",function(){e.stop()}),i&&i.element&&(e.element=i.element),e};var t=pc.Application.getApplication();t&&t.addTweenManager()}();var bowlerEntity,fakeBall,initPosition,Bowler=pc.createScript("bowler"),isBowling=!0;Bowler.prototype.initialize=function(){bowlerEntity=this.entity,initPosition=new pc.Vec3(.4,.8,-9),fakeBall=bowlerEntity.findByName("fakeBall")},Bowler.prototype.update=function(o){isBowling&&(Bowler.prototype.EnableBall(),bowlerEntity.translateLocal(new pc.Vec3(0,0,.05))),isBowling&&bowlerEntity.getPosition().z>-7&&(console.log("bowler reached!"),isBowling=!1,bowlerEntity.sprite.play("bowl"),Bowler.prototype.DisableBall())},Bowler.prototype.DisableBall=function(){fakeBall.enabled=!1},Bowler.prototype.EnableBall=function(){fakeBall.enabled=!0},Bowler.prototype.RestPosition=function(){console.log("bowler resetPos!"+initPosition.z),bowlerEntity.setPosition(initPosition),bowlerEntity.sprite.play("idle")},Bowler.prototype.Bowl=function(){isBowling=!0};var wicket,rb,initPos,pos,ballEntity,multiply,hadBounce,shotTaken,trail,currentLocation,isBoundary,fixedSpeed,runningScore,difficulty,DoBall=pc.createScript("doBall"),power=0,distance=0,isFirstFour=!0,isSecondFour=!0;function ResetBowlingRoutine(){FielderFollow.prototype.UnFollow(),Ucontroll.prototype.BatIconOn(),Bowler.prototype.RestPosition(),DoBall.prototype.ResetBall(),DoBall.prototype.DoTheBall(),isBoundary=!0}function FindDifficulty(){var o=0;Uiscore.prototype.getScore()>20&&(o=Math.floor(Uiscore.prototype.getScore()/20),console.log("tempD: "+o)),difficulty=o/10,console.log("difficulty: "+difficulty)}function GetRndFloat(){var o;return Math.random()>.5?(o=-1*Math.random())<-.1&&(o=-.1):(o=1*Math.random())>.1&&(o=.1),o}function GetRndFloatSpeed(){var o;return(o=1*Math.random())>.6&&(o=.6),o}function GetRndInt(){var o;return(o=Math.floor(10*Math.random()))>8?o=8:o<5&&(o=5),o}function GetShotAngle(){var o;return SelectCameraAngle(o=Math.random()>.5?-3*Math.random():3*Math.random()),o}function ResetBounceValue(){hadBounce=!1}function SetBounceValue(){hadBounce=!0}function GetBounceValue(){return hadBounce}function StopBall(){rb.type="kinematic"}function StartBall(){rb.type="dynamic"}function SelectCameraAngle(o){o>0?Math.abs(o)>1.2?SmoothCamera.prototype.LookRight():SmoothCamera.prototype.LookMiddle():Math.abs(o)>1.2?SmoothCamera.prototype.LookLeft():SmoothCamera.prototype.LookMiddle()}DoBall.prototype.initialize=function(){ballEntity=this.entity,runningScore=4,rb=this.entity.rigidbody,wicket=new pc.Vec3(0,0,4),initPos=new pc.Vec3(0,2.2,-4.2),trail=ballEntity.findByName("trail"),this.entity.collision.on("collisionstart",this.onCollisionStart,this),hadBounce=!1,shotTaken=!1,isBoundary=!0,difficulty=0;var o=this.app.touch;o&&o.on(pc.EVENT_TOUCHEND,this.onTouchEnd,this),DoBall.prototype.currentLocation1=ballEntity.getPosition().x,DoBall.prototype.currentLocation2=ballEntity.getPosition().z,ballEntity.model.enabled=!1,trail.enabled=!1},DoBall.prototype.onCollisionStart=function(o){o.other.rigidbody&&(o.other.tags.has("boundary")?(Striker.prototype.StrikerReset(),shotTaken&&isBoundary&&(hadBounce?(isFirstFour?(SoundsController.prototype.PlayBoundaryMusic(),isFirstFour=!1):(isFirstFour=!0,SoundsController.prototype.PlayBoundarySixMusic()),Uiscore.prototype.changeScore(4),isBoundary=!1,BaloonUpfour.prototype.BaloonFly(),Crowd.prototype.CrowdCheer(),CrowdUp.prototype.CrowdCheer()):(isFirstFour?(SoundsController.prototype.PlayBoundaryMusic(),isFirstFour=!1):(isFirstFour=!0,SoundsController.prototype.PlayBoundarySixMusic()),Uiscore.prototype.changeScore(6),isBoundary=!1,BaloonUpsix.prototype.BaloonFlysix(),Crowd.prototype.CrowdCheer(),CrowdUp.prototype.CrowdCheer())),DoBall.prototype.ResetBowling()):o.other.tags.has("ground")?SetBounceValue():o.other.tags.has("fielder")?(Uiscore.prototype.changeScore(1),Striker.prototype.StrikerReset(),DoBall.prototype.throwBall()):o.other.tags.has("stamp2")?(Uiscore.prototype.changeScore(1),Striker.prototype.StrikerReset(),DoBall.prototype.ResetBowling()):o.other.tags.has("backBoundary")?(Striker.prototype.StrikerReset(),DoBall.prototype.ResetBowling(),SoundsController.prototype.PlayOhhSound(),Striker.prototype.PlaySad()):o.other.tags.has("pitch"))},DoBall.prototype.ResetBowling=function(){setTimeout(ResetBowlingRoutine,500)},DoBall.prototype.update=function(o){currentLocation=this.entity.getPosition(),this.app.keyboard.wasPressed(pc.KEY_RIGHT)&&(rb.type="kinematic",distance=wicket.z-ballEntity.getLocalPosition().z,power=0,distance<4&&(power=4-distance),rb.type="dynamic",this.ballEntity.rigidbody.applyImpulse(new pc.Vec3(GetRndFloat(),1.5*power,-5.5*power)))},DoBall.prototype.DoBat=function(){distance=wicket.z-ballEntity.getLocalPosition().z,FielderFollow.prototype.Follow();var o=1;distance>0&&(power=4,distance<4?(Striker.prototype.PlayShot(),rb.type="kinematic",power=6-distance,distance<.5?power=6.5:distance>2&&(o=.5),rb.type="dynamic",rb.applyImpulse(new pc.Vec3(GetShotAngle(),power*o,-1.5*power)),ResetBounceValue(),shotTaken=!0,Bowler.prototype.RestPosition(),Fielder.prototype.FollowBall(),SoundsController.prototype.PlayBatBallSounds(),SoundsController.prototype.PlayRunSound(),Ucontroll.prototype.BatIconOff()):Striker.prototype.PlayShotFake())},DoBall.prototype.DoTheBall=function(){Bowler.prototype.Bowl(),ResetBounceValue(),setTimeout(DoBall.prototype.BallRoutine,1e3)},DoBall.prototype.BallRoutine=function(){ballEntity.model.enabled=!0,trail.enabled=!0,rb.type="dynamic";var o=10.3+GetRndFloatSpeed();console.log("Extreme value test ---------------------------------------------------- "),FindDifficulty(),console.log("Extreme Vale check "+o);rb.applyImpulse(new pc.Vec3(GetRndFloat(),1,4.5+difficulty));SoundsController.prototype.PlayBallingSound()},DoBall.prototype.ResetBall=function(){rb.type="kinematic",ballEntity.model.enabled=!1,trail.enabled=!1,ballEntity&&(rb.type="dynamic",ballEntity.setPosition(new pc.Vec3(.12,1.2,-9)),rb.type="kinematic"),shotTaken=!1,SmoothCamera.prototype.LookMiddle()},DoBall.prototype.GetLocation=function(){return currentLocation},DoBall.prototype.throwBall=function(){StopBall(),DoBall.prototype.ResetBowling()};var Rotate=pc.createScript("rotate");Rotate.prototype.initialize=function(){},Rotate.prototype.update=function(t){this.app.keyboard.isPressed(pc.KEY_LEFT)&&(console.log("app"),this.entity.rotateLocal(0,-2,0)),this.entity.rotateLocal(0,2,0)};var Wicket,DoBat=pc.createScript("doBat");DoBat.prototype.initialize=function(){Wicket=this.entity,this.entity.collision.on("collisionstart",this.onCollisionStart,this),Wicket.sprite.play("default")},DoBat.prototype.update=function(t){},DoBat.prototype.GetTity=function(t){return this.Entity},DoBat.prototype.onCollisionStart=function(t){t.other.rigidbody&&(Wicket.sprite.play("out"),MoveEntity.prototype.shouldMove=!0,0===Uiscore.prototype.getScore()?(SoundsController.prototype.PlayDuckSound(),console.log("DUCKKKK Play"),SoundsController.prototype.PlayStumpHitSound()):(SoundsController.prototype.PlayOutSound(),SoundsController.prototype.PlayStumpHitSound(),console.log(Uiscore.prototype.getScore()+"  More than DUCKKKK Play")),DoBall.prototype.ResetBall(),FielderFollow.prototype.UnFollow(),Ucontroll.prototype.Disble(),LeaderBoard.prototype.Test())},DoBat.prototype.ResetWicket=function(){Wicket.sprite.play("default")};var UIScoreEntity,Uiscore=pc.createScript("uiscore"),actualScore=0,scoreFiftyDone=!1,scoreHundredDone=!1;Uiscore.prototype.initialize=function(){UIScoreEntity=this.entity,Uiscore.prototype.changeScore(0)},Uiscore.prototype.update=function(o){},Uiscore.prototype.test="Jahir",Uiscore.prototype.onPress=function(o){console.log("Touch Up"),i+=10,this.testScore.element.text=i},Uiscore.prototype.onRelease=function(o){console.log("Touch Down")},Uiscore.prototype.changeScore=function(o){0===o&&(actualScore=0),actualScore+=o,UIScoreEntity.element.text=actualScore,console.log("actual/score: "+actualScore+"/"+o),actualScore>=50&&!scoreFiftyDone&&(scoreFiftyDone=!0,SoundsController.prototype.PlayFiftySound()),actualScore>=100&&!scoreHundredDone&&(scoreHundredDone=!0,SoundsController.prototype.PlayFiftySound())},Uiscore.prototype.getScore=function(){return actualScore};var GameManager=pc.createScript("gameManager");GameManager.prototype.initialize=function(){},GameManager.prototype.update=function(a){};var strikerEntity,Striker=pc.createScript("striker");Striker.prototype.initialize=function(){strikerEntity=this.entity},Striker.prototype.update=function(t){},Striker.prototype.PlayShot=function(){strikerEntity.sprite.play("shot"),setTimeout(Striker.prototype.PlayIdle,200)},Striker.prototype.PlayIdle=function(){strikerEntity.sprite.play("idle"),strikerEntity.sprite.play("hide"),Runner.prototype.runnerRun()},Striker.prototype.PlayShotFake=function(){strikerEntity.sprite.play("shot"),setTimeout(Striker.prototype.PlayIdleFake,200)},Striker.prototype.PlaySad=function(){strikerEntity.sprite.play("sad"),setTimeout(Striker.prototype.PlayIdleFake,700)},Striker.prototype.PlayIdleFake=function(){strikerEntity.sprite.play("idle")},Striker.prototype.Show=function(){strikerEntity.sprite.play("idle")},Striker.prototype.Hide=function(){strikerEntity.sprite.play("hide")},Striker.prototype.StrikerReset=function(){strikerEntity.sprite.play("idle"),Runner.prototype.runnerReset()};var fielderEntity,Fielder=pc.createScript("fielder");Fielder.attributes.add("duration",{type:"number",default:1}),Fielder.attributes.add("easing",{type:"string",default:"Linear"}),Fielder.attributes.add("delay",{type:"number",default:0}),Fielder.attributes.add("loop",{type:"boolean",default:!0}),Fielder.attributes.add("yoyo",{type:"boolean",default:!1}),Fielder.attributes.add("repeat",{type:"number",default:2}),Fielder.attributes.add("direction",{type:"number",default:1});var start,dest,initPosition,Direction,isFollowing=!1;function GetRandomDistance(){var t;return t=Math.random()>.5?-2:2,console.log("## values: "+t),t}Fielder.prototype.update=function(t){},Fielder.prototype.initialize=function(){fielderEntity=this.entity,initPosition=fielderEntity.getPosition(),Direction=new pc.Vec3(0,0,-15),this.on("attr:duration",function(t){this.tween.duration=t},this),this.on("attr:easing",this.reset,this),this.on("attr:delay",this.reset,this),this.on("attr:loop",this.reset,this),this.on("attr:yoyo",this.reset,this),this.on("attr:repeat",this.reset,this),this.on("attr:direction",function(t){Direction=t},this),this.reset()},Fielder.prototype.ResetPosition=function(t){},Fielder.prototype.reset=function(t){this.tween&&this.tween.stop(),fielderEntity.setLocalPosition(fielderEntity.getLocalPosition());this.getDistance(fielderEntity.getPosition(),new pc.Vec3(DoBall.prototype.currentLocation1,.7,DoBall.prototype.currentLocation2));this.tween=fielderEntity.tween(fielderEntity.getLocalPosition()).to(new pc.Vec3(fielderEntity.getLocalPosition().x+GetRandomDistance(),.7,fielderEntity.getLocalPosition().z),this.duration,pc[this.easing]).delay(this.delay).loop(this.loop).yoyo(this.yoyo),this.loop||this.tween.repeat(this.repeat),this.tween.start()},Fielder.prototype.getDistance=function(t,e){var i=t.x-e.x,o=t.y-e.y,n=t.z-e.z;return new pc.Vec3(i,o,n).length()},Fielder.prototype.FollowBall=function(){},Fielder.prototype.StopFollowBall=function(){isFollowing=!1};var Batting=pc.createScript("batting");Batting.attributes.add("BatP",{type:"asset",assetType:"texture"}),Batting.attributes.add("BatR",{type:"asset",assetType:"texture"}),Batting.prototype.initialize=function(){this.originalTexture=this.entity.element.textureAsset,this.entity.element.on("mouseenter",this.onEnter,this),this.entity.element.on("mousedown",this.onPress,this),this.entity.element.on("mouseup",this.onRelease,this),this.entity.element.on("mouseleave",this.onLeave,this),this.entity.element.on("touchstart",this.onPress,this),this.entity.element.on("touchend",this.onRelease,this)},Batting.prototype.update=function(t){},Batting.prototype.onPress=function(t){console.log("Batting"),t.element.textureAsset=this.BatP,DoBall.prototype.DoBat()},Batting.prototype.onRelease=function(t){t.element.textureAsset=this.BatR,console.log("Bat remove")};// LeaderBoard.js

var LeaderBoard = pc.createScript('leaderBoard');

// initialize code called once per entity
LeaderBoard.prototype.initialize = function() {
    console.log("Leader ============= Board");
    //Test(); 
};

// update code called every frame
LeaderBoard.prototype.update = function(dt) {
    
   
};

LeaderBoard.prototype.ConnectedPlayerList = function(){
    
    FBInstant.player.getConnectedPlayersAsync()
  .then(function(players) {
    console.log(players.map(function(player) {
      return {
        id: player.getID(),
        name: player.getName(),
        photo: player.getPhoto(),
      }
    }));
  });
};

LeaderBoard.prototype.Test = function(){
    console.log("Before ============= Instant");
    var contextId = FBInstant.context.getID();
    
    FBInstant
  .getLeaderboardAsync('cheese_puff_1')
  .then(function(leaderboard) {
    console.log(leaderboard.getName());
    return leaderboard.setScoreAsync(Uiscore.prototype.getScore());
  })
  .then(function(){
        console.log('Score saved');
        LeaderBoard.prototype.lbUpdate();
    })
  .catch(function(error){
        console.error('Name of error '+error);
    });   
    
    

};

  ////Test(); 

LeaderBoard.prototype.getDataFromLeaderboard = function(){
    
      console.log("Inside Retrive");

    FBInstant
  .getLeaderboardAsync('cheese_puff_1')
  .then(leaderboard => leaderboard.getEntriesAsync(11, 0))
  .then(entries => {
    for (var i = 0; i < entries.length; i++) {
      console.log(
        entries[i].getRank() + '. ' +
        entries[i].getPlayer().getName() + ': ' +
        entries[i].getScore() + ': ' +
        entries[i].getPlayer().getID() 
      );
    }
  }).catch(error => console.error('Unable retrive lb ---------------- '+error));
    
};
    

LeaderBoard.prototype.getDataFromLeaderboard_2 = function(){
    
    FBInstant
  .getLeaderboardAsync('cheese_puff_1')
  .then( function(leaderboard){
       leaderboard.getPlayerEntryAsync(); 
    })
  .then( function(entry) {
    console.log(
      entry[0].getRank() + '. ' +
      entry[0].getPlayer().getName() + ': ' +
      entry[0].getScore()
    );
  }).catch( function(error){ 
        console.error(error);
    });
    
};
 
 
LeaderBoard.prototype.lbUpdate = function(){
    
  console.log("Inside UPDATE");
    FBInstant.updateAsync({
  action: 'LEADERBOARD',
  name: 'cheese_puff_1'
})
  .then(function () {
        console.log('Update Posted');
        //FBInstant.quit(); 
        ////LeaderBoard.prototype.getDataFromLeaderboard();
    })
  .catch(function() { 
        console.error(error);
    });
};


var targetLeft,targetRight,targetMiddle,values,preValues,SmoothCamera=pc.createScript("smoothCamera");SmoothCamera.prototype.initialize=function(){this.targetPosition=this.entity.getPosition(),this.targetRotation=this.entity.getRotation(),targetLeft=!1,targetRight=!1,targetMiddle=!1,this.speed=5,values=0,preValues=0},SmoothCamera.prototype.update=function(t){var e=this.entity.getRotation();targetMiddle?values=0:targetLeft?values<.2?values+=t/10:values=.2:targetRight?values>-.2?values-=t/10:values=-.2:values=0,preValues=values,this.entity.setRotation(e.x,preValues,e.z,e.w)},SmoothCamera.prototype.LookLeft=function(t){targetLeft=!0,targetRight=!1,targetMiddle=!1},SmoothCamera.prototype.LookRight=function(t){targetLeft=!1,targetRight=!0,targetMiddle=!1},SmoothCamera.prototype.LookMiddle=function(t){targetLeft=!1,targetRight=!1,targetMiddle=!0};var SoundButton=pc.createScript("soundButton"),isSoundOn=!0;SoundButton.attributes.add("SoundOn",{type:"asset",assetType:"texture"}),SoundButton.attributes.add("SoundOff",{type:"asset",assetType:"texture"}),SoundButton.prototype.isSoundOnP=!0,SoundButton.prototype.initialize=function(){this.originalTexture=this.entity.element.textureAsset,this.entity.element.on("mouseenter",this.onEnter,this),this.entity.element.on("mousedown",this.onPress,this),this.entity.element.on("mouseup",this.onRelease,this),this.entity.element.on("mouseleave",this.onLeave,this),this.entity.element.on("touchstart",this.onPress,this),this.entity.element.on("touchend",this.onRelease,this)},SoundButton.prototype.update=function(t){},SoundButton.prototype.onPress=function(t){isSoundOn?(console.log("Sound going to close"),t.element.textureAsset=this.SoundOff,isSoundOn=!1,SoundButton.prototype.isSoundOnP=!1,SoundsController.prototype.StopMenuMusic()):(console.log("Sound going to open"),t.element.textureAsset=this.SoundOn,isSoundOn=!0,SoundButton.prototype.isSoundOnP=!0,SoundsController.prototype.PlayBatBallSounds(),SoundsController.prototype.PlayMenuMusic())};var batButton,PlayButton=pc.createScript("playButton");PlayButton.attributes.add("PlayPressed",{type:"asset",assetType:"texture"}),PlayButton.attributes.add("PlayRelease",{type:"asset",assetType:"texture"}),PlayButton.prototype.initialize=function(){this.originalTexture=this.entity.element.textureAsset,this.entity.element.on("mouseenter",this.onEnter,this),this.entity.element.on("mousedown",this.onPress,this),this.entity.element.on("mouseup",this.onRelease,this),this.entity.element.on("mouseleave",this.onLeave,this),this.entity.element.on("touchstart",this.onPress,this),this.entity.element.on("touchend",this.onRelease,this)},PlayButton.prototype.update=function(t){},PlayButton.prototype.onPress=function(t){t.element.textureAsset=this.PlayPressed},PlayButton.prototype.onRelease=function(t){t.element.textureAsset=this.PlayRelease,LeaderBoard.prototype.ConnectedPlayerList(),(batButton=this.app.root.findByName("BattingButton")).enabled=!0,SoundsController.prototype.PlayBatBallSounds(),SoundsController.prototype.StopMenuMusic(),SoundsController.prototype.PlayGamePlaySound(),Uicontroller.prototype.disableUI(),DoBall.prototype.DoTheBall()};var OutController,Uicontroller=pc.createScript("uicontroller");Uicontroller.prototype.initialize=function(){OutController=this.entity},Uicontroller.prototype.update=function(o){},Uicontroller.prototype.disableUI=function(){console.log("Disable UI"),OutController.enabled=!1},Uicontroller.prototype.enableUI=function(){console.log("Enable UI"),OutController.enabled=!0};var Fbquit=pc.createScript("fbquit");Fbquit.prototype.initialize=function(){this.entity.element.on("mouseenter",this.onEnter,this),this.entity.element.on("mousedown",this.onPress,this),this.entity.element.on("mouseup",this.onRelease,this),this.entity.element.on("mouseleave",this.onLeave,this),this.entity.element.on("touchstart",this.onPress,this),this.entity.element.on("touchend",this.onRelease,this)},Fbquit.prototype.update=function(t){},Fbquit.prototype.onPress=function(t){console.log("Its Quit-------"),Ucontroll.prototype.EnbleMainMenu()};var crowdEntity,isJumping,startPosition,startPositionDown,goingUp,Crowd=pc.createScript("crowd");Crowd.prototype.initialize=function(){crowdEntity=this.entity,isJumping=!1,goingUp=!0,startPosition=this.entity.getPosition().y+.5,startPositionDown=this.entity.getPosition().y},Crowd.prototype.update=function(t){isJumping&&(goingUp?this.entity.getPosition().y<startPosition?this.entity.translateLocal(new pc.Vec3(0,.05,0)):goingUp=!1:this.entity.getPosition().y>startPositionDown?this.entity.translateLocal(new pc.Vec3(0,-.05,0)):goingUp=!0)},Crowd.prototype.CrowdCheer=function(t){Crowd.prototype.CheerStart(),setTimeout(Crowd.prototype.CheerEnd,1e3)},Crowd.prototype.CheerStart=function(t){isJumping=!0},Crowd.prototype.CheerEnd=function(t){isJumping=!1};var crowdEntity,isJumping,startPositionDown,goingUp,CrowdUp=pc.createScript("crowdUp");CrowdUp.prototype.initialize=function(){isJumping=!1,goingUp=!0,this.startPosition=this.entity.getPosition().y+.5,this.startPositionDown=this.entity.getPosition().y},CrowdUp.prototype.update=function(t){isJumping&&(goingUp?this.entity.getPosition().y<this.startPosition?this.entity.translateLocal(new pc.Vec3(0,.05,0)):goingUp=!1:this.entity.getPosition().y>this.startPositionDown?this.entity.translateLocal(new pc.Vec3(0,-.05,0)):goingUp=!0)},CrowdUp.prototype.CrowdCheer=function(t){CrowdUp.prototype.CheerStart(),setTimeout(CrowdUp.prototype.CheerEnd,1e3)},CrowdUp.prototype.CheerStart=function(t){isJumping=!0},CrowdUp.prototype.CheerEnd=function(t){isJumping=!1};var fourBaloon,fourPosition,isGoingUp,BaloonUpfour=pc.createScript("baloonUpfour");BaloonUpfour.prototype.initialize=function(){this.startPositionf=this.entity.getPosition(),fourPosition=this.entity.getPosition(),isGoingUp=!1},BaloonUpfour.prototype.update=function(o){isGoingUp?this.entity.translateLocal(new pc.Vec3(0,.2,0)):this.entity.setPosition(new pc.Vec3(this.startPositionf.x,.6,this.startPositionf.z))},BaloonUpfour.prototype.BaloonFly=function(o){isGoingUp=!0,setTimeout(BaloonUpfour.prototype.BaloonReset,2e3)},BaloonUpfour.prototype.BaloonReset=function(o){isGoingUp=!1};var sixBaloon,sixPosition,isGoingUpSix,BaloonUpsix=pc.createScript("baloonUpsix");BaloonUpsix.prototype.initialize=function(){this.startPositions=this.entity.getPosition(),sixPosition=this.entity.getPosition(),isGoingUpSix=!1},BaloonUpsix.prototype.update=function(i){isGoingUpSix?this.entity.translateLocal(new pc.Vec3(0,.2,0)):this.entity.setPosition(new pc.Vec3(this.startPositions.x,.6,this.startPositions.z))},BaloonUpsix.prototype.BaloonFlysix=function(i){isGoingUpSix=!0,setTimeout(BaloonUpsix.prototype.BaloonReset,2e3)},BaloonUpsix.prototype.BaloonReset=function(i){isGoingUpSix=!1};var MoveEntity=pc.createScript("moveEntity");MoveEntity.prototype.shouldMove=!1,MoveEntity.prototype.initialize=function(){this.startPosition=this.entity.getPosition().clone(),this.targetPosition=this.entity.getPosition().clone(),this.targetPosition.y=6.699,this.time=0,this.duration=.3,this.delay=3,this.easingType="linear",this.entity.on("ui:changeEasingType",function(t){this.easingType=t},this),this.app.on("ui:resetTween",function(){this.time=0},this)},MoveEntity.prototype.update=function(t){if(MoveEntity.prototype.shouldMove){this.time;this.time+=t,this.time>this.duration+this.delay&&(this.time=0,MoveEntity.prototype.shouldMove=!1);var i=pc.math.clamp(this.time/this.duration,0,1),e=Easing[this.easingType](i),s=Easing.tween(e,this.startPosition.x,this.targetPosition.x),o=Easing.tween(e,this.startPosition.y,this.targetPosition.y),n=Easing.tween(e,this.startPosition.z,this.targetPosition.z);this.entity.setPosition(s,o,n)}};Easing={linear:function(n){return n},easeInQuad:function(n){return n*n},easeOutQuad:function(n){return n*(2-n)},easeInOutQuad:function(n){return n<.5?2*n*n:(4-2*n)*n-1},easeInCubic:function(n){return n*n*n},easeOutCubic:function(n){return--n*n*n+1},easeInOutCubic:function(n){return n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1},easeInQuart:function(n){return n*n*n*n},easeOutQuart:function(n){return 1- --n*n*n*n},easeInOutQuart:function(n){return n<.5?8*n*n*n*n:1-8*--n*n*n*n},easeInQuint:function(n){return n*n*n*n*n},easeOutQuint:function(n){return 1+--n*n*n*n*n},easeInOutQuint:function(n){return n<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n},tween:function(n,u,t){return(t-u)*n+u}};var ReTry=pc.createScript("reTry");ReTry.prototype.initialize=function(){this.entity.element.on("mouseenter",this.onEnter,this),this.entity.element.on("mousedown",this.onPress,this),this.entity.element.on("mouseup",this.onRelease,this),this.entity.element.on("mouseleave",this.onLeave,this),this.entity.element.on("touchstart",this.onPress,this),this.entity.element.on("touchend",this.onRelease,this)},ReTry.prototype.update=function(e){},ReTry.prototype.onPress=function(e){console.log("Press Re-try ########################"),Uiscore.prototype.changeScore(0),Ucontroll.prototype.Enble(),DoBall.prototype.ResetBowling(),DoBat.prototype.ResetWicket()};var OutSc,batButton,Ucontroll=pc.createScript("ucontroll");Ucontroll.prototype.initialize=function(){OutSc=this.entity.findByName("OutGroup"),batButton=this.entity.findByName("BattingButton")},Ucontroll.prototype.update=function(t){},Ucontroll.prototype.Disble=function(){batButton.enabled=!1,OutSc.enabled=!0},Ucontroll.prototype.Enble=function(){batButton.enabled=!0,OutSc.enabled=!1},Ucontroll.prototype.EnbleMainMenu=function(){Ucontroll.prototype.BatIconOff(),DoBat.prototype.ResetWicket(),OutSc.enabled=!1,Uicontroller.prototype.enableUI(),Uiscore.prototype.changeScore(0),SoundsController.prototype.StopGamePlayMusic(),SoundsController.prototype.PlayMenuMusic()},Ucontroll.prototype.BatIconOn=function(){batButton.enabled=!0},Ucontroll.prototype.BatIconOff=function(){batButton.enabled=!1};var runnerEntity,initialPosition,isRunning,isAnimating,Runner=pc.createScript("runner");Runner.prototype.initialize=function(){runnerEntity=this.entity,isRunning=!1,isAnimating=!1,initialPosition=new pc.Vec3(-.194,.775,3.327),this.entity.sprite.play("empty")},Runner.prototype.update=function(n){isRunning&&(this.entity.translateLocal(new pc.Vec3(0,0,-.1)),isAnimating||Runner.prototype.backAnimation()),this.entity.getPosition().z<-7&&(isAnimating=!1,isRunning=!1,runnerEntity.sprite.play("stand"))},Runner.prototype.backAnimation=function(){runnerEntity.sprite.play("back"),isAnimating=!0},Runner.prototype.runnerRun=function(){isRunning=!0},Runner.prototype.runnerReset=function(){runnerEntity.sprite.play("empty"),runnerEntity.setLocalPosition(initialPosition),isAnimating=!1,isRunning=!1};var sounds,batButton,SoundsController=pc.createScript("soundsController");SoundsController.prototype.initialize=function(){sounds=this.entity,SoundsController.prototype.PlayMenuMusic(),(batButton=this.app.root.findByName("BattingButton")).enabled=!1},SoundsController.prototype.update=function(o){},SoundsController.prototype.PlayBoundaryMusic=function(){SoundButton.prototype.isSoundOnP&&sounds.sound.play("boundaryfour")},SoundsController.prototype.PlayBoundarySixMusic=function(){SoundButton.prototype.isSoundOnP&&sounds.sound.play("boundarysix")},SoundsController.prototype.PlayBatBallSounds=function(){SoundButton.prototype.isSoundOnP&&sounds.sound.play("collide")},SoundsController.prototype.PlayOutSound=function(){SoundButton.prototype.isSoundOnP&&sounds.sound.play("out")},SoundsController.prototype.PlayGamePlaySound=function(){SoundButton.prototype.isSoundOnP&&(sounds.sound.play("gameplay").loop=!0)},SoundsController.prototype.StopGamePlayMusic=function(){sounds.sound.stop("gameplay")},SoundsController.prototype.PlayMenuMusic=function(){SoundButton.prototype.isSoundOnP&&(sounds.sound.play("menumusic").loop=!0)},SoundsController.prototype.StopMenuMusic=function(){sounds.sound.stop("menumusic")},SoundsController.prototype.PlayBallingSound=function(){SoundButton.prototype.isSoundOnP&&sounds.sound.play("balling")},SoundsController.prototype.PlayDuckSound=function(){SoundButton.prototype.isSoundOnP&&sounds.sound.play("duck")},SoundsController.prototype.PlayRunSound=function(){SoundButton.prototype.isSoundOnP&&sounds.sound.play("run")},SoundsController.prototype.PlayFiftySound=function(){SoundButton.prototype.isSoundOnP&&sounds.sound.play("fifty")},SoundsController.prototype.PlayStumpHitSound=function(){SoundButton.prototype.isSoundOnP&&sounds.sound.play("bowled")},SoundsController.prototype.PlayOhhSound=function(){SoundButton.prototype.isSoundOnP&&sounds.sound.play("ohh")};var blipInitialPos,BlipMovement=pc.createScript("blipMovement");BlipMovement.prototype.initialize=function(){blipInitialPos=new pc.Vec3(30,17,-31)},BlipMovement.prototype.update=function(t){this.entity.getPosition().x>-30?this.entity.translateLocal(new pc.Vec3(-.05,0,0)):this.entity.setPosition(blipInitialPos)};// LbUIController.js
var LbUicontroller = pc.createScript('lbUicontroller');

var lbController;
var index;
var rankText;
var nameText;
var scoreText;
var playerImage;
var playerId;
var playerBanner;
var backBtn;
var self;
var fbImageContainer;
var mainGameBGImg;

var creaseStriker;
var plane;
var pitch;
var menuGroup;
var batButton;
LbUicontroller.prototype.url1 = '';
LbUicontroller.prototype.url2 = '';
LbUicontroller.prototype.url3 = '';
LbUicontroller.prototype.url4 = '';
LbUicontroller.prototype.url5 = '';
LbUicontroller.prototype.url6 = '';
LbUicontroller.prototype.url7 = '';
LbUicontroller.prototype.url8 = '';
LbUicontroller.prototype.url9 = '';
LbUicontroller.prototype.url10 = '';
LbUicontroller.prototype.url11 = '';

// initialize code called once per entity
LbUicontroller.prototype.initialize = function() {
   // lbController = this.app.root.findByName('LeaderboardGroup'); //this.entity.findByName('LeaderboardGroup');
             // mouse events
    lbController = this.app.root.findByName('LeaderboardGroup');
     backBtn = this.app.root.findByName('backButton');
    fbImageContainer = this.app.root.findByName('fbImageContainer');
    mainGameBGImg = this.app.root.findByName('BGImg');

    menuGroup = this.app.root.findByName('MenuGroup');
    
    this.entity.element.on('mouseenter', this.onEnter, this);
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('mouseup', this.onRelease, this);
    this.entity.element.on('mouseleave', this.onLeave, this);    
    
    // touch events
    this.entity.element.on('touchstart', this.onPress, this);
    this.entity.element.on('touchend', this.onRelease, this);
};

// update code called every frame
LbUicontroller.prototype.update = function(dt) {
   
};
 LbUicontroller.prototype.url1 = "";


LbUicontroller.prototype.onPress = function (event) { 
    batButton = this.app.root.findByName('BattingButton');
    lbController = this.app.root.findByName('LeaderboardGroup');
    backBtn = this.app.root.findByName('backButton');
    fbImageContainer = this.app.root.findByName('fbImageContainer');
    mainGameBGImg = this.app.root.findByName('BGImg');
    
    menuGroup = this.app.root.findByName('MenuGroup');
    creaseStriker = this.app.root.findByName('CreaseStriker');
    plane = this.app.root.findByName('Plane');
    pitch = this.app.root.findByName('Pitch');
    
    SoundsController.prototype.PlayBatBallSounds();
    lbController.enabled = true;
    backBtn.enabled = true;
    fbImageContainer.enabled = true;
    mainGameBGImg.enabled = false;
    
    creaseStriker.enabled = false;
    plane.enabled = false;
    pitch.enabled = false;
    Striker.prototype.Hide();
    menuGroup.enabled = false;
    batButton.enabled = false;
    FBInstant
  .getLeaderboardAsync('cheese_puff_1')
  .then(leaderboard => leaderboard.getPlayerEntryAsync())
  .then(entry => {
    console.log(
      entry.getRank() + '. ' +
      entry.getPlayer().getName() + ': ' +
      entry.getScore() + ': '+
      entry.getPlayer().getID()
    );
        playerId = entry.getPlayer().getID();
        
            
        playerBanner = this.app.root.findByName('banner11');
        playerBanner.enabled = true;
        rankText = this.app.root.findByName('rank11');
        rankText.element.text = entry.getRank() + '. ';
        
        nameText = this.app.root.findByName('name11');
        nameText.element.text = entry.getPlayer().getName();
        
        scoreText = this.app.root.findByName('score11');
        scoreText.element.text =entry.getScore();
            
            LbUicontroller.prototype.url11 = entry.getPlayer().getPhoto();
            FbtestImage10.prototype.isStartShow = true; 
        //playerImage = this.app.root.findByName('image11');
        //playerImage.enabled = true;
        //playerImage.element.textureAsset =entry[i].getPlayer().getPhoto();
        
        
  }).catch(error => console.error(error));
    
    
    
     
    
    
    
    FBInstant
  .getLeaderboardAsync('cheese_puff_1')
  .then(leaderboard => leaderboard.getEntriesAsync(11, 0))
  .then(entries => {
    for (var i = 0; i < entries.length; i++) {
        
      console.log(
        entries[i].getRank() + '. ' +
        entries[i].getPlayer().getName() + ': ' +
        entries[i].getScore() + ': ' +
        entries[i].getPlayer().getID() + ': '+
        entries[i].getPlayer().getPhoto() 
      );
        
        if(entries[i].getPlayer().getID()== playerId){
            playerBanner = this.app.root.findByName('banner'+(i+1));
            playerBanner.enabled = true;
        }
        rankText = this.app.root.findByName('rank'+(i+1));
        rankText.element.text = entries[i].getRank() + '. ';
        
        nameText = this.app.root.findByName('name'+(i+1));
        nameText.element.text = entries[i].getPlayer().getName();
        
        scoreText = this.app.root.findByName('score'+(i+1));
        scoreText.element.text =entries[i].getScore();
        
        
        
        //playerImage = this.app.root.findByName('image'+(i+1));
        //playerImage.enabled = true;
      
        //playerImage.element.textureAsset = entries[i].getPlayer().getPhoto();
        //console.log("Full Name Check ********************** "+entries[i].getPlayer().getFullName());
        
        if(i===0){
            LbUicontroller.prototype.url1 = entries[i].getPlayer().getPhoto();
            
            FbtestImage.prototype.isStartShow = true;     
        }
        else if(i===1){
            LbUicontroller.prototype.url2 = entries[i].getPlayer().getPhoto();
            FbtestImage1.prototype.isStartShow = true;
            
        }
        else if(i===2){
            LbUicontroller.prototype.url3 = entries[i].getPlayer().getPhoto();
            FbtestImage2.prototype.isStartShow = true;
        }
        else if(i===3){
            LbUicontroller.prototype.url4 = entries[i].getPlayer().getPhoto();
          FbtestImage3.prototype.isStartShow = true;
        }
        else if(i===4){
            LbUicontroller.prototype.url5 = entries[i].getPlayer().getPhoto();
            FbtestImage4.prototype.isStartShow = true;
        }
        else if(i===5){
            LbUicontroller.prototype.url6 = entries[i].getPlayer().getPhoto();
            FbtestImage5.prototype.isStartShow = true;
        }
        else if(i===6){
            LbUicontroller.prototype.url7 = entries[i].getPlayer().getPhoto();
            FbtestImage6.prototype.isStartShow = true;
        }
        else if(i===7){
            LbUicontroller.prototype.url8 = entries[i].getPlayer().getPhoto();
            FbtestImage7.prototype.isStartShow = true;
        }
        else if(i===8){
            LbUicontroller.prototype.url9 = entries[i].getPlayer().getPhoto();
            FbtestImage8.prototype.isStartShow = true;
        }
        else if(i===9){
            LbUicontroller.prototype.url10 = entries[i].getPlayer().getPhoto();
            FbtestImage9.prototype.isStartShow = true;
        }
       
       
        
    }
       
  }).catch(error => console.error('Unable retrive lb ---------------- '+error));
};


// swap method called for script hot-reloading
// inherit your script state here
// LbUicontroller.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/

var lbBack,bButton,fbImageContainer,mainGameBGImg,batButton,BackButton=pc.createScript("backButton");BackButton.prototype.initialize=function(){bButton=this.entity,this.entity.element.on("mouseenter",this.onEnter,this),this.entity.element.on("mousedown",this.onPress,this),this.entity.element.on("mouseup",this.onRelease,this),this.entity.element.on("mouseleave",this.onLeave,this),this.entity.element.on("touchstart",this.onPress,this),this.entity.element.on("touchend",this.onRelease,this)},BackButton.prototype.update=function(t){},BackButton.prototype.onPress=function(t){console.log("Back Button Pressed"),SoundsController.prototype.PlayBatBallSounds(),batButton=this.app.root.findByName("BattingButton"),lbBack=this.app.root.findByName("LeaderboardGroup"),fbImageContainer=this.app.root.findByName("fbImageContainer"),mainGameBGImg=this.app.root.findByName("BGImg"),menuGroup=this.app.root.findByName("MenuGroup"),creaseStriker=this.app.root.findByName("CreaseStriker"),plane=this.app.root.findByName("Plane"),pitch=this.app.root.findByName("Pitch"),fbImageContainer.enabled=!1,lbBack.enabled=!1,bButton.enabled=!1,mainGameBGImg.enabled=!0,menuGroup.enabled=!0,creaseStriker.enabled=!0,plane.enabled=!0,pitch.enabled=!0,batButton.enabled=!0,Striker.prototype.Show()};var ownPosition,targetPosition,isFollowing,startLoc,FielderFollow=pc.createScript("fielderFollow");FielderFollow.prototype.initialize=function(){ownPosition=this.entity.getPosition(),targetPosition=(new pc.Vec3).ZERO,isFollowing=!1,this.startLocation=this.entity.getPosition(),this.x=this.startLocation.x,this.y=this.startLocation.y,this.z=this.startLocation.z},FielderFollow.prototype.update=function(t){if(isFollowing){if(targetPosition=DoBall.prototype.GetLocation(),FielderFollow.prototype.getDistance(this.entity.getPosition(),targetPosition)<8){ownPosition.lerp(this.entity.getPosition(),targetPosition,.4*t);var o=new pc.Vec3(ownPosition.x,.7,ownPosition.z);this.entity.setPosition(o)}}else this.entity.setPosition(new pc.Vec3(this.x,this.y,this.z))},FielderFollow.prototype.Follow=function(){isFollowing=!0},FielderFollow.prototype.UnFollow=function(){isFollowing=!1},FielderFollow.prototype.getDistance=function(t,o){var i=t.x-o.x,e=t.y-o.y,n=t.z-o.z;return new pc.Vec3(i,e,n).length()};var FbtestImage=pc.createScript("fbtestImage");FbtestImage.prototype.isStartShow=!1,FbtestImage.attributes.add("url",{type:"string"}),FbtestImage.prototype.update=function(){if(FbtestImage.prototype.isStartShow){var t=this,e=new Image;e.crossOrigin="anonymous",e.onload=function(){var r=new pc.Texture(t.app.graphicsDevice);r.setSource(e);var o=t.entity.model.material;o.emissiveMap=r,o.update()},e.src=LbUicontroller.prototype.url1,console.log("URL VAlue ++++++++++++++++ LbUicontroller.prototype.url1"),FbtestImage.prototype.isStartShow=!1}},FbtestImage.prototype.test=function(){var t=new Image;t.crossOrigin="anonymous",t.onload=function(){var e=new pc.Texture(self.app.graphicsDevice);e.setSource(t);var r=self.entity.model.material;r.emissiveMap=e,r.update()},t.src=this.url};var FbtestImage1=pc.createScript("FbtestImage1");FbtestImage1.prototype.isStartShow=!1,FbtestImage1.prototype.update=function(){if(FbtestImage1.prototype.isStartShow){var e=this,t=new Image;t.crossOrigin="anonymous",t.onload=function(){var a=new pc.Texture(e.app.graphicsDevice);a.setSource(t);var r=e.entity.model.material;r.emissiveMap=a,r.update()},t.src=LbUicontroller.prototype.url2,FbtestImage1.prototype.isStartShow=!1}},FbtestImage1.prototype.test=function(){var e=new Image;e.crossOrigin="anonymous",e.onload=function(){var t=new pc.Texture(self.app.graphicsDevice);t.setSource(e);var a=self.entity.model.material;a.emissiveMap=t,a.update()},e.src=this.url};var FbtestImage2=pc.createScript("FbtestImage2");FbtestImage2.prototype.isStartShow=!1,FbtestImage2.prototype.update=function(){if(FbtestImage2.prototype.isStartShow){var e=this,t=new Image;t.crossOrigin="anonymous",t.onload=function(){var a=new pc.Texture(e.app.graphicsDevice);a.setSource(t);var r=e.entity.model.material;r.emissiveMap=a,r.update()},t.src=LbUicontroller.prototype.url3,FbtestImage2.prototype.isStartShow=!1}},FbtestImage2.prototype.test=function(){var e=new Image;e.crossOrigin="anonymous",e.onload=function(){var t=new pc.Texture(self.app.graphicsDevice);t.setSource(e);var a=self.entity.model.material;a.emissiveMap=t,a.update()},e.src=this.url};var FbtestImage3=pc.createScript("fbtestImage3");FbtestImage3.prototype.isStartShow=!1,FbtestImage3.prototype.update=function(){if(FbtestImage3.prototype.isStartShow){var e=this,t=new Image;t.crossOrigin="anonymous",t.onload=function(){var a=new pc.Texture(e.app.graphicsDevice);a.setSource(t);var r=e.entity.model.material;r.emissiveMap=a,r.update()},t.src=LbUicontroller.prototype.url4,FbtestImage3.prototype.isStartShow=!1}},FbtestImage3.prototype.test=function(){var e=new Image;e.crossOrigin="anonymous",e.onload=function(){var t=new pc.Texture(self.app.graphicsDevice);t.setSource(e);var a=self.entity.model.material;a.emissiveMap=t,a.update()},e.src=this.url};var FbtestImage4=pc.createScript("fbtestImage4");FbtestImage4.prototype.isStartShow=!1,FbtestImage4.prototype.update=function(){if(FbtestImage4.prototype.isStartShow){var e=this,t=new Image;t.crossOrigin="anonymous",t.onload=function(){var a=new pc.Texture(e.app.graphicsDevice);a.setSource(t);var r=e.entity.model.material;r.emissiveMap=a,r.update()},t.src=LbUicontroller.prototype.url5,FbtestImage4.prototype.isStartShow=!1}},FbtestImage4.prototype.test=function(){var e=new Image;e.crossOrigin="anonymous",e.onload=function(){var t=new pc.Texture(self.app.graphicsDevice);t.setSource(e);var a=self.entity.model.material;a.emissiveMap=t,a.update()},e.src=this.url};var FbtestImage5=pc.createScript("fbtestImage5");FbtestImage5.prototype.isStartShow=!1,FbtestImage5.prototype.update=function(){if(FbtestImage5.prototype.isStartShow){var e=this,t=new Image;t.crossOrigin="anonymous",t.onload=function(){var a=new pc.Texture(e.app.graphicsDevice);a.setSource(t);var r=e.entity.model.material;r.emissiveMap=a,r.update()},t.src=LbUicontroller.prototype.url6,FbtestImage5.prototype.isStartShow=!1}},FbtestImage5.prototype.test=function(){var e=new Image;e.crossOrigin="anonymous",e.onload=function(){var t=new pc.Texture(self.app.graphicsDevice);t.setSource(e);var a=self.entity.model.material;a.emissiveMap=t,a.update()},e.src=this.url};var FbtestImage6=pc.createScript("fbtestImage6");FbtestImage6.prototype.isStartShow=!1,FbtestImage6.prototype.update=function(){if(FbtestImage6.prototype.isStartShow){var e=this,t=new Image;t.crossOrigin="anonymous",t.onload=function(){var a=new pc.Texture(e.app.graphicsDevice);a.setSource(t);var r=e.entity.model.material;r.emissiveMap=a,r.update()},t.src=LbUicontroller.prototype.url7,FbtestImage6.prototype.isStartShow=!1}},FbtestImage6.prototype.test=function(){var e=new Image;e.crossOrigin="anonymous",e.onload=function(){var t=new pc.Texture(self.app.graphicsDevice);t.setSource(e);var a=self.entity.model.material;a.emissiveMap=t,a.update()},e.src=this.url};var FbtestImage7=pc.createScript("fbtestImage7");FbtestImage7.prototype.isStartShow=!1,FbtestImage7.prototype.update=function(){if(FbtestImage7.prototype.isStartShow){var e=this,t=new Image;t.crossOrigin="anonymous",t.onload=function(){var a=new pc.Texture(e.app.graphicsDevice);a.setSource(t);var r=e.entity.model.material;r.emissiveMap=a,r.update()},t.src=LbUicontroller.prototype.url8,FbtestImage7.prototype.isStartShow=!1}},FbtestImage7.prototype.test=function(){var e=new Image;e.crossOrigin="anonymous",e.onload=function(){var t=new pc.Texture(self.app.graphicsDevice);t.setSource(e);var a=self.entity.model.material;a.emissiveMap=t,a.update()},e.src=this.url};var FbtestImage8=pc.createScript("fbtestImage8");FbtestImage8.prototype.isStartShow=!1,FbtestImage8.prototype.update=function(){if(FbtestImage8.prototype.isStartShow){var e=this,t=new Image;t.crossOrigin="anonymous",t.onload=function(){var a=new pc.Texture(e.app.graphicsDevice);a.setSource(t);var r=e.entity.model.material;r.emissiveMap=a,r.update()},t.src=LbUicontroller.prototype.url9,FbtestImage8.prototype.isStartShow=!1}},FbtestImage8.prototype.test=function(){var e=new Image;e.crossOrigin="anonymous",e.onload=function(){var t=new pc.Texture(self.app.graphicsDevice);t.setSource(e);var a=self.entity.model.material;a.emissiveMap=t,a.update()},e.src=this.url};var FbtestImage9=pc.createScript("fbtestImage9");FbtestImage9.prototype.isStartShow=!1,FbtestImage9.prototype.update=function(){if(FbtestImage9.prototype.isStartShow){var e=this,t=new Image;t.crossOrigin="anonymous",t.onload=function(){var a=new pc.Texture(e.app.graphicsDevice);a.setSource(t);var r=e.entity.model.material;r.emissiveMap=a,r.update()},t.src=LbUicontroller.prototype.url10,FbtestImage9.prototype.isStartShow=!1}},FbtestImage9.prototype.test=function(){var e=new Image;e.crossOrigin="anonymous",e.onload=function(){var t=new pc.Texture(self.app.graphicsDevice);t.setSource(e);var a=self.entity.model.material;a.emissiveMap=t,a.update()},e.src=this.url};var FbtestImage10=pc.createScript("fbtestImage10");FbtestImage10.prototype.isStartShow=!1,FbtestImage10.prototype.update=function(){if(FbtestImage10.prototype.isStartShow){var e=this,t=new Image;t.crossOrigin="anonymous",t.onload=function(){var a=new pc.Texture(e.app.graphicsDevice);a.setSource(t);var r=e.entity.model.material;r.emissiveMap=a,r.update()},t.src=LbUicontroller.prototype.url11,FbtestImage10.prototype.isStartShow=!1}},FbtestImage10.prototype.test=function(){var e=new Image;e.crossOrigin="anonymous",e.onload=function(){var t=new pc.Texture(self.app.graphicsDevice);t.setSource(e);var a=self.entity.model.material;a.emissiveMap=t,a.update()},e.src=this.url};