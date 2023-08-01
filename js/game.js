
// constants
var CANV_W = 1280;
var CANV_H = 720;
var SHEET_GEM_SIZE = 93;
var GEM_SIZE = 63;
var GEM_SPACING = 3;
var GEM_SIZE_SPACED = GEM_SIZE + GEM_SPACING;
var BOARD_COLS, BOARD_ROWS;
var MATCH_MIN = 3; // min number of same color gems required in a row to be considered a match
var GEM_AREA = [.442 * CANV_W, 0.0444444 * CANV_H, .52 * CANV_W, CANV_H * 0.95];
var SCORE_NEEDED = 300;

// gems
var gems;
var selectedGem = null;
var selectedGemStartPos;
var selectedGemTween;
var tempShiftedGem = null;

// stats & input
var allowInput;
var moves_left = 15;
var score = 0, score_text, moves_text;
var mouse_x, mouse_y;

// menus
var plate, dim_background, logo, logo_button;
var start_button_image, start_button, start_text_top, start_text_bot;
var try_again_button_image, try_again_button, try_again_text;
var win_banner, win_close_image, win_close_button, sign_up_image, sign_up_button, follow_image, follow_button, win_text, follow_text, win_banner_text;

// sounds
var music, match3, match4, match5, win, lose, slide, gemfall;

// game
var window_ready, font_ready;
var game;
function try_start() {
	if(window_ready && font_ready) {
		game = new Phaser.Game(CANV_W, CANV_H, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
		try {
			game.scale.forceOrientation(true, false);
		} catch(e) {

		}
	}	
}

function preload() {

	game.load.spritesheet("GEMS", "image/gems.png", SHEET_GEM_SIZE, SHEET_GEM_SIZE);

	game.load.image("background", "image/background.jpg");
	game.load.image("logo", "image/logo.png");

	game.load.image("plate", "image/plate.png");
	game.load.image("play_now", "image/play_now.png");
	game.load.image("play_now_hover", "image/play_now_hover.png");
	game.load.image("try_again", "image/try_again.png");
	game.load.image("try_again_hover", "image/try_again_hover.png");
	game.load.image("sign_up", "image/sign_up.png");
	game.load.image("sign_up_hover", "image/sign_up_hover.png");
	game.load.image("follow", "image/follow.png");
	game.load.image("follow_hover", "image/follow_hover.png");
	game.load.image("win_close", "image/win_close.png");	
	game.load.image("win_close_hover", "image/win_close_hover.png");	
	game.load.image("sparkle", "image/sparkle.png");
	game.load.image("dim_background", "image/dim.png");
	game.load.image("win_banner", "image/win_banner.png");
	game.load.image("hand", "image/hand.png");
	game.load.image("facebook", "image/facebook.png");
	game.load.image("instagram", "image/instagram.png");
	game.load.image("youtube", "image/youtube.png");

	game.load.audio("music", "audio/music.mp3");
	game.load.audio("match3", "audio/match3.mp3");
	game.load.audio("match4", "audio/match4.mp3");
	game.load.audio("match5", "audio/match5.mp3");
	game.load.audio("win", "audio/win.mp3");
	game.load.audio("lose", "audio/lose.mp3");
	game.load.audio("gemfall", "audio/gemfall.mp3");
	game.load.audio('slide', 'audio/slide.mp3');
}
var tutorialHand;
function create() {

	var back = game.add.sprite(0, 0, "background");
	back.width =  CANV_W;
	back.height = CANV_H;

	dim_background = game.add.sprite(0, 0, "dim_background");
	dim_background.width = CANV_W;
	dim_background.height = CANV_H;
	dim_background.visible = false;

	plate = game.add.sprite(0, 0, "plate");
	plate.width = 500;
	plate.height = CANV_H - 50;
	plate.x = CANV_W / 2 - plate.width / 2;
	plate.y = CANV_H / 2 - plate.height / 2;
	plate.visible = false;

	// var sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');

    // sprite.anchor.setTo(0.5, 0.5);
    // sprite.alpha = 100;

    // //  Create our tween. This will fade the sprite to alpha 1 over the duration of 2 seconds
   
	
	

	

	logo = game.add.sprite(0, 0, "logo");
	logo.scale.set(0.5);
	logo.x = 0;
	logo.y = CANV_H - logo.height;


	logo_button = game.add.button(0, 0, '', function() { window.open('http://masquerademedia.net/', '_blank');});
	logo_button.x = logo.x;
	logo_button.y = logo.y;
	logo_button.width = logo.width;
	logo_button.height = logo.height;

	facebook = game.add.sprite(0, 0, "facebook");
	facebook.scale.set(0.1);
	facebook.x = logo.x + 150;
	facebook.y = logo.y+30;

	facebook_button = game.add.button(0, 0, '', function() { window.open('https://m.facebook.com/Wishesgives', '_blank');});
	facebook_button.x = facebook.x;
	facebook_button.y = facebook.y;
	facebook_button.width = facebook.width;
	facebook_button.height = facebook.height;

	instagram = game.add.sprite(0, 0, "instagram");
	instagram.scale.set(0.1);
	instagram.x = logo.x + 220;
	instagram.y = logo.y+30;

	instagram_button = game.add.button(0, 0, '', function() { window.open('https://www.instagram.com/wishesgives/', '_blank');});
	instagram_button.x = instagram.x;
	instagram_button.y = instagram.y;
	instagram_button.width = instagram.width;
	instagram_button.height = instagram.height;

	youtube = game.add.sprite(0, 0, "youtube");
	youtube.scale.set(0.1);
	youtube.x = logo.x + 290;
	youtube.y = logo.y+30;

	youtube_button = game.add.button(0, 0, '', function() { window.open('https://m.youtube.com/channel/UC3u7ffTuaJ5aQ-2xCVKk4oQ', '_blank');});
	youtube_button.x = youtube.x;
	youtube_button.y = youtube.y;
	youtube_button.width = youtube.width;
	youtube_button.height = youtube.height;



	make_start_screen();
	
	
	make_try_again_screen();
	make_stat_text();
	make_win_screen();

	music = game.add.audio("music");
	match3 = game.add.audio("match3");
	match4 = game.add.audio("match4");
	match5 = game.add.audio("match5");
	win = game.add.audio("win");
	lose = game.add.audio("lose");
	gemfall = game.add.audio("gemfall");
	slide = game.add.audio("slide");
	
	match3.volume = 0.3;
	match4.volume = 0.3;
	match5.volume = 0.3;
	win.volume = 0.8;
	lose.volume = 0.5;
	slide.volume = 1.0;
	gemfall.volume = 0.25;
	music.volume = 0.25;

	music.loopFull();
	game.physics.startSystem(Phaser.Physics.ARCADE);

	show_start_screen();
}
var counting = 10;

function update() {

	score_text.setText("Score: " + score);
	moves_text.setText("Moves Remaining: " + moves_left);
	

	if(allowInput && moves_left > 0)
		slideGem(game.input.activePointer, mouse_x - GEM_AREA[0], mouse_y - GEM_AREA[1]);

	if(allowInput && moves_left == 0 && !game.input.activePointer.isDown) {
		dropGems();
		allowInput = false;

		game.time.events.add(500, function(){

	    	if(score < SCORE_NEEDED) {
				show_try_again_screen();
			} else {
				show_win_screen();
			}
		}, this);
	}
	if(score >= SCORE_NEEDED){

		show_win_screen();
		moves_left = 0;
	}
	
	
}


function update_mouse(pointer, x, y) {
	mouse_x = x;
	mouse_y = y;
	// tutorialHand.x = mouse_x;
	// tutorialHand.y= mouse_y
	
	


	
}
	
function make_try_again_screen() {

	try_again_button_image = game.add.sprite(0, 0, "try_again");
	try_again_button_image.width = plate.width - 300;
	try_again_button_image.height = 85;
	try_again_button_image.x = plate.x + plate.width / 2 - try_again_button_image.width / 2 + 10;
	try_again_button_image.y = plate.y + plate.height - try_again_button_image.height - 50;
	try_again_button_image.visible = false;

	try_again_button = game.add.button(0, 0, '', restart_game);
	try_again_button.x = try_again_button_image.x;
	try_again_button.y = try_again_button_image.y;
	try_again_button.width = try_again_button_image.width;
	try_again_button.height = try_again_button_image.height;
	try_again_button.visible = false;

	var over = function() {
		try_again_button_image.loadTexture("try_again_hover");
	}
	var out = function() {
		try_again_button_image.loadTexture("try_again");
	}
	try_again_button.events.onInputOver.add(over, this);
	try_again_button.events.onInputOut.add(out, this);

	try_again_text = game.add.text(0, 0, "Oops!\nYou did not\nwin enough\npoints!");
	try_again_text.font = 'Courgette';
	try_again_text.fontSize = 50;
	try_again_text.x = plate.x + plate.width / 2 - try_again_text.width / 2;
	try_again_text.y = plate.y + (plate.height - try_again_button_image.height) / 2 - try_again_text.height / 2;
	try_again_text.align = 'center';
	try_again_text.visible = false;
}

function make_win_screen() {
	
	win_banner = game.add.sprite(0, 0, "win_banner");
	win_banner.x = plate.x - 25;
	win_banner.y = plate.y;
	win_banner.height = 200;
	win_banner.width = plate.width + 70;
	win_banner.visible = false;
	
	win_close_image = game.add.sprite(0, 0, "win_close");
	win_close_image.width = 100;
	win_close_image.height = 75;
	win_close_image.x = win_banner.x;
	win_close_image.y = win_banner.y;
	win_close_image.visible = false;

	win_close_button = game.add.button(0, 0, '', restart_game);
	win_close_button.x = win_close_image.x;
	win_close_button.y = win_close_image.y;
	win_close_button.width = win_close_image.width;
	win_close_button.height = win_close_image.height;
	win_close_button.visible = false;
	
	var over = function() {
		win_close_image.loadTexture("win_close_hover");
	}
	var out = function() {
		win_close_image.loadTexture("win_close");
	}
	win_close_button.events.onInputOver.add(over, this);
	win_close_button.events.onInputOut.add(out, this);

	win_banner_text = game.add.text(0, 0, "Congrats!");
	win_banner_text.font = 'Courgette';
	win_banner_text.fontSize = 50;
	win_banner_text.x = win_banner.x + win_banner.width / 2 - win_banner_text.width / 2 - 10;
	win_banner_text.y = win_banner.y + win_banner.height / 4 - win_banner_text.height / 2;
	win_banner_text.align = 'center';
	win_banner_text.visible = false;

	win_text = game.add.text(0, 0, "You have\nWon!");
	win_text.font = 'Courgette';
	win_text.fontSize = 50;
	win_text.align = 'center';
	win_text.x = win_banner.x + win_banner.width / 2 - win_text.width / 2 - 10;
	win_text.y = win_banner.y + win_banner.height - win_text.height / 4;
	win_text.visible = false;

	sign_up_image = game.add.sprite(0, 0, "sign_up");
	sign_up_image.width = plate.width - 150;
	sign_up_image.height = 85;
	sign_up_image.x = plate.x + plate.width / 2 - sign_up_image.width / 2 + 10;
	sign_up_image.y = plate.y + plate.height - sign_up_image.height - 50;
	sign_up_image.visible = false;

	sign_up_button = game.add.button(0, 0, '', function() { sign_up_image.loadTexture("sign_up"); window.open('http://masquerademedia.net/', '_blank'); });
	sign_up_button.x = sign_up_image.x;
	sign_up_button.y = sign_up_image.y;
	sign_up_button.height = sign_up_image.height;
	sign_up_button.width = sign_up_image.width;
	sign_up_button.visible = false;

	var sover = function() {
		sign_up_image.loadTexture("sign_up_hover");
	}
	var sout = function() {
		sign_up_image.loadTexture("sign_up");
	}
	sign_up_button.events.onInputOver.add(sover, this);
	sign_up_button.events.onInputOut.add(sout, this);

	follow_text = game.add.text(0, 0, 'for more games');
	follow_text.font = 'Courgette';
	follow_text.fontSize = 40;
	follow_text.align = 'center';
	follow_text.x = sign_up_image.x + (sign_up_image.width - follow_text.width) / 2;
	follow_text.y = sign_up_image.y - follow_text.height - 10;
	follow_text.visible = false;

	follow_image = game.add.sprite(0, 0, "follow");
	follow_image.width = plate.width - 150;
	follow_image.height = 85;
	follow_image.x = sign_up_image.x;
	follow_image.y = follow_text.y - follow_image.height;
	follow_image.visible = false;
	
	follow_button = game.add.button(0, 0, '', function() { follow_image.loadTexture("follow"); window.open('https://m.facebook.com/Wishesgives', '_blank'); });
	follow_button.x = follow_image.x;
	follow_button.y = follow_image.y;
	follow_button.height = follow_image.height;
	follow_button.width = follow_image.width;
	follow_button.visible = false;

	var fover = function() {
		follow_image.loadTexture("follow_hover");
	}
	var fout = function() {
		follow_image.loadTexture("follow");
	}
	follow_button.events.onInputOver.add(fover, this);
	follow_button.events.onInputOut.add(fout, this);
}

function hide_win_screen() {
	plate.visible = false;
	dim_background.visible = false;
	win_banner.visible = false;
	win_close_image.visible = false;
	win_close_button.visible = false;
	sign_up_image.visible = false;
	sign_up_button.visible = false;
	follow_image.visible = false;
	follow_button.visible = false;
	win_text.visible = false;
	follow_text.visible = false;
	win_banner_text.visible = false;
	sign_up_image.loadTexture("sign_up");
	follow_image.loadTexture("follow");
	win_close_image.loadTexture("win_close");
}

function show_win_screen() {
	win.play();
	dim_background.visible = true;
	dim_background.bringToTop();
	plate.visible = true;
	plate.bringToTop();
	win_banner.visible = true;
	win_banner.bringToTop();
	win_banner_text.visible = true;
	win_banner_text.parent.bringToTop(win_banner_text);
	win_close_image.visible = true;
	win_close_image.bringToTop();
	win_close_button.visible = true;
	win_close_button.bringToTop();
	sign_up_image.visible = true;
	sign_up_image.bringToTop();
	sign_up_button.visible = true;
	sign_up_button.bringToTop();
	follow_image.visible = true;
	follow_image.bringToTop();
	follow_button.visible = true;
	follow_button.bringToTop();
	win_text.visible = true;
	win_text.parent.bringToTop(win_text);
	follow_text.visible = true;
	follow_text.parent.bringToTop(follow_text);

}

function make_start_screen() {
	
	

	start_button_image = game.add.sprite(0, 0, "play_now");
	start_button_image.width = plate.width - 300;
	start_button_image.height = 85;
	start_button_image.x = plate.x + plate.width / 2 - start_button_image.width / 2 + 10;
	start_button_image.y = plate.y + plate.height - start_button_image.height - 50;
	start_button_image.visible = false;

	start_button = game.add.button(0, 0, '', start_game);
	start_button.x = start_button_image.x;
	start_button.y = start_button_image.y;
	start_button.width = start_button_image.width;
	start_button.height = start_button_image.height;
	start_button.visible = false;

	var over = function() {
		start_button_image.loadTexture("play_now_hover");
		console.log("this is play 1...")
	}
	var out = function() {
		start_button_image.loadTexture("play_now");
		console.log("this is play 2...")

	}
	start_button.events.onInputOver.add(over, this);
	start_button.events.onInputOut.add(out, this);

	start_text_top = game.add.text(0, 0, "Welcome to\nLove Charms");
	start_text_top.font = 'Courgette';
	start_text_top.fontSize = 50;
	start_text_top.x = plate.x + plate.width / 2 - start_text_top.width / 2;
	start_text_top.y = plate.y + 50;
	start_text_top.align = 'center';
	start_text_top.visible = false;

	start_text_bot = game.add.text(0, 0, "Collect\n" + SCORE_NEEDED + " Points\nin 15 Moves")
	start_text_bot.font = 'Courgette';
	start_text_bot.fontSize = 50;
	start_text_bot.x = plate.x + plate.width / 2 - start_text_bot.width / 2;
	start_text_bot.y = plate.y + 250;
	start_text_bot.align = 'center';
	start_text_bot.visible = false;

}

function show_start_screen() {
	dim_background.visible = true;
	dim_background.bringToTop();
	plate.visible = true;
	plate.bringToTop();
	start_button_image.visible = true;
	start_button_image.bringToTop();
	start_button.visible = true;
	start_button.bringToTop();
	start_text_top.visible = true;
	start_text_top.parent.bringToTop(start_text_top);
	start_text_bot.visible = true;
	start_text_bot.parent.bringToTop(start_text_bot);
}

function hide_start_screen() {
	dim_background.visible = false;
	plate.visible = false;
	start_button_image.visible = false;
	start_button.visible = false;
	start_text_top.visible = false;
	start_text_bot.visible = false;
	start_button_image.loadTexture("play_now");
}

function hide_try_again_screen() {
	dim_background.visible = false;
	plate.visible = false;
	try_again_button_image.visible = false;
	try_again_button.visible = false;
	try_again_text.visible = false;
	try_again_button_image.loadTexture("try_again");
}

function show_try_again_screen() {
	lose.play();
	dim_background.visible = true;
	dim_background.bringToTop();
	plate.visible = true;
	plate.bringToTop();
	try_again_button_image.visible = true;
	try_again_button_image.bringToTop();
	try_again_button.visible = true;
	try_again_button.bringToTop();
	try_again_text.visible = true;
	try_again_text.parent.bringToTop(try_again_text);
}

function make_stat_text() {
	moves_text = game.add.text(15, 15, "Moves Remaining: " + moves_left);
	moves_text.font = 'Courgette';
	moves_text.fontSize = 35;
	moves_text.fill = '#d41c66';
	moves_text.visible = false;

	score_text = game.add.text(15, 15 + moves_text.height, "Score: " + score);
	score_text.font = 'Courgette';
	score_text.fontSize = 35;
	score_text.fill = '#d41c66';
	score_text.visible = false;
};

function hide_stat_text() {
	moves_text.visible = false;
	score_text.visible = false;
}

function show_stat_text() {
	moves_text.visible = true;
	score_text.visible = true;
}

function restart_game() {
	
	

	score = 0;
	moves_left = 15;
	score_text.setText("Score: " + score);
	moves_text.setText("Moves Remaining: " + moves_left);

	hide_win_screen();
	hide_try_again_screen();

	gems.destroy();
	start_game();
}

function start_game() {

	hide_start_screen();
	show_stat_text();
	spawnBoard();
	
	selectedGemStartPos = { x: 0, y: 0 };
	allowInput = false;
	game.input.addMoveCallback(update_mouse, this);
	

	
}

function releaseGem() {

	if (tempShiftedGem === null) {
		selectedGem = null;
		return;
	}

	var canKill = checkAndKillGemMatches(selectedGem);
	canKill = checkAndKillGemMatches(tempShiftedGem) || canKill;

	if (!canKill) {
		var gem = selectedGem;
		if (gem.posX !== selectedGemStartPos.x || gem.posY !== selectedGemStartPos.y) {
			if (selectedGemTween !== null) {
				game.tweens.remove(selectedGemTween);
			}

			selectedGemTween = tweenGemPos(gem, selectedGemStartPos.x, selectedGemStartPos.y);

			if (tempShiftedGem !== null) {
				tweenGemPos(tempShiftedGem, gem.posX, gem.posY);
			}

			swapGemPosition(gem, tempShiftedGem);
			tempShiftedGem = null;
		}
	}

	removeKilledGems();
	var dropGemDuration = dropGems();
	game.time.events.add(dropGemDuration * 60, refillBoard);

	allowInput = false;
	selectedGem = null;
	tempShiftedGem = null;
}

function slideGem(pointer, x, y) {
	

	if (selectedGem && pointer.isDown) {
		var cursorGemPosX = getGemPos(x);
		var cursorGemPosY = getGemPos(y);


		if (checkIfGemCanBeMovedHere(selectedGemStartPos.x, selectedGemStartPos.y, cursorGemPosX, cursorGemPosY)) {
			if (cursorGemPosX !== selectedGem.posX || cursorGemPosY !== selectedGem.posY) {
				if (selectedGemTween !== null) {
					game.tweens.remove(selectedGemTween);
				}

				selectedGemTween = tweenGemPos(selectedGem, cursorGemPosX, cursorGemPosY);

				gems.bringToTop(selectedGem);

				if (tempShiftedGem !== null) {
					tweenGemPos(tempShiftedGem, selectedGem.posX , selectedGem.posY);
					swapGemPosition(selectedGem, tempShiftedGem);
					slide.play(forceRestart=false);
				}
			
				tempShiftedGem = getGem(cursorGemPosX, cursorGemPosY);

				if (tempShiftedGem === selectedGem) {
					tempShiftedGem = null;
				} else if(moves_left > 0) {
					tweenGemPos(tempShiftedGem, selectedGem.posX, selectedGem.posY);
					swapGemPosition(selectedGem, tempShiftedGem);
					slide.play(forceRestart=false);
					moves_left--;
					tutorialHand.destroy();
				}
			}
		}
	}
}

function spawnBoard() {

	BOARD_COLS = Math.floor(GEM_AREA[2] / GEM_SIZE_SPACED);
	BOARD_ROWS = Math.floor(GEM_AREA[3] / GEM_SIZE_SPACED);

	gems = game.add.group();
	console.log("this is play 3...")
	

	for (var i = 0; i < BOARD_COLS; i++) {
		for (var j = 0; j < BOARD_ROWS; j++) {
			var gem = gems.create(GEM_AREA[0] + i * GEM_SIZE_SPACED, GEM_AREA[1] + j * GEM_SIZE_SPACED, "GEMS");
			gem.scale.set(GEM_SIZE / SHEET_GEM_SIZE);
			gem.name = 'gem' + i.toString() + 'x' + j.toString();
			gem.inputEnabled = true;
			gem.events.onInputDown.add(selectGem, this);
			gem.events.onInputUp.add(releaseGem, this);
			randomizeGemColor(gem);
			setGemPos(gem, i, j);
			gem.kill();
		}
	}

	removeKilledGems();
	dropGems();
	refillBoard();

	allowInput = false;
	selectedGem = null;
	tempShiftedGem = null;
}

function selectGem(gem) {
	console.log("select gems...")
	
	if (allowInput) {
		selectedGem = gem;
		selectedGemStartPos.x = gem.posX;
		selectedGemStartPos.y = gem.posY;
	}
}

function getGem(posX, posY) {

	return gems.iterate("id", calcGemId(posX, posY), Phaser.Group.RETURN_CHILD);
}

function getGemPos(coordinate) {

	return Math.floor(coordinate / GEM_SIZE_SPACED);
}

function setGemPos(gem, posX, posY) {

	gem.posX = posX;
	gem.posY = posY;
	gem.id = calcGemId(posX, posY);
}

function calcGemId(posX, posY) {

	return posX + posY * BOARD_COLS;
}

function getGemColor(gem) {

	return gem.frame;
}

function randomizeGemColor(gem) {

	gem.frame = game.rnd.integerInRange(0, gem.animations.frameTotal - 1);
}

function checkIfGemCanBeMovedHere(fromPosX, fromPosY, toPosX, toPosY) {

	if (toPosX < 0 || toPosX >= BOARD_COLS || toPosY < 0 || toPosY >= BOARD_ROWS) {
		return false;
	}
	if (fromPosX === toPosX && fromPosY >= toPosY - 1 && fromPosY <= toPosY + 1) {
		return true;
	}
	if (fromPosY === toPosY && fromPosX >= toPosX - 1 && fromPosX <= toPosX + 1) {
		return true;
	}

	return false;
}

function countSameColorGems(startGem, moveX, moveY) {

	var curX = startGem.posX + moveX;
	var curY = startGem.posY + moveY;
	var count = 0;

	while (curX >= 0 && curY >= 0 && curX < BOARD_COLS && curY < BOARD_ROWS && getGemColor(getGem(curX, curY)) === getGemColor(startGem)) {
		count++;
		curX += moveX;
		curY += moveY;
	}

	return count;
}

function swapGemPosition(gem1, gem2) {

	var tempPosX = gem1.posX;
	var tempPosY = gem1.posY;
	setGemPos(gem1, gem2.posX, gem2.posY);
	setGemPos(gem2, tempPosX, tempPosY);
	
}

function checkAndKillGemMatches(gem) {

	// if (gem === null) { return; }

	var canKill = false;
	var countUp = countSameColorGems(gem, 0, -1);
	var countDown = countSameColorGems(gem, 0, 1);
	var countLeft = countSameColorGems(gem, -1, 0);
	var countRight = countSameColorGems(gem, 1, 0);
	var countHoriz = countLeft + countRight + 1;
	var countVert = countUp + countDown + 1;

	if (countVert >= MATCH_MIN) {
		killGemRange(gem.posX, gem.posY - countUp, gem.posX, gem.posY + countDown);
		score += countVert;
		if(countVert == 3) {
			match3.play(forceRestart=false);
		} else if(countVert == 4) {
			match4.play(forceRestart=false);
		} else {
			match5.play(forceRestart=false);
		}
		canKill = true;
	}
	if (countHoriz >= MATCH_MIN) {
		killGemRange(gem.posX - countLeft, gem.posY, gem.posX + countRight, gem.posY);
		score += countHoriz;
		if(countHoriz == 3) {
			match3.play(forceRestart=false);
		} else if(countHoriz == 4) {
			match4.play(forceRestart=false);
		} else {
			match5.play(forceRestart=false);
		}
		canKill = true;
	}

	return canKill;

}

function killGemRange(fromX, fromY, toX, toY) {

	fromX = Phaser.Math.clamp(fromX, 0, BOARD_COLS - 1);
	fromY = Phaser.Math.clamp(fromY , 0, BOARD_ROWS - 1);
	toX = Phaser.Math.clamp(toX, 0, BOARD_COLS - 1);
	toY = Phaser.Math.clamp(toY, 0, BOARD_ROWS - 1);

	for (var i = fromX; i <= toX; i++) {
		for (var j = fromY; j <= toY; j++) {
			var gem = getGem(i, j);
			if(gem != null) {
				gem.kill();

				(function() {
					var emitter = game.add.emitter(0, 0, 5);
					emitter.x = gem.x + gem.width / 2;
					emitter.y = gem.y + gem.height / 2;
					emitter.setScale(0.3, 0.6, 0.3, 0.6, 0);
					emitter.setAlpha(1, 0, 750)
					emitter.makeParticles('sparkle');
					emitter.start(true, 750, null, 5);
					game.time.events.add(750, function(){emitter.destroy();}, this);
				})();
			}
		}
	}
}

function removeKilledGems() {

	gems.forEach(function(gem) {
		if (!gem.alive) {
			setGemPos(gem, -1,-1);
		}
	});
}

function tweenGemPos(gem, newPosX, newPosY, durationMultiplier) {

	if (durationMultiplier === null || typeof durationMultiplier === 'undefined') {
		durationMultiplier = 1;
	}

	return game.add.tween(gem).to({x: GEM_AREA[0] + newPosX  * GEM_SIZE_SPACED, y: GEM_AREA[1] + newPosY * GEM_SIZE_SPACED}, 100 * durationMultiplier, Phaser.Easing.Quadratic.Out, true);
}

function dropGems() {

	var dropRowCountMax = 0;

	for (var i = 0; i < BOARD_COLS; i++) {
		var dropRowCount = 0;

		for (var j = BOARD_ROWS - 1; j >= 0; j--) {
			var gem = getGem(i, j);

			if (gem === null)	 {
				dropRowCount++;
			} else if (dropRowCount > 0) {
				gem.dirty = true;
				setGemPos(gem, gem.posX, gem.posY + dropRowCount);
				var timeout = tweenGemPos(gem, gem.posX, gem.posY, dropRowCount);
				gemfall.play(forceRestart=false);
			}
		}

		dropRowCountMax = Math.max(dropRowCount, dropRowCountMax);
	}

	return dropRowCountMax;
}

function refillBoard() {
	var maxGemsMissingFromCol = 0;

	for (var i = 0; i < BOARD_COLS; i++) {
		var gemsMissingFromCol = 0;

		for (var j = BOARD_ROWS - 1; j >= 0; j--) {
			var gem = getGem(i, j);

			if (gem === null) {
				gemsMissingFromCol++;
				gem = gems.getFirstDead();
				if(gem === null) return;
				gem.reset(GEM_AREA[0] + i * GEM_SIZE_SPACED, -gemsMissingFromCol * GEM_SIZE_SPACED);
				gem.dirty = true;
				randomizeGemColor(gem);
				setGemPos(gem, i, j);
				tweenGemPos(gem, gem.posX, gem.posY, gemsMissingFromCol * 2);
				gemfall.play(forceRestart=false);
			}
		}

		maxGemsMissingFromCol = Math.max(maxGemsMissingFromCol, gemsMissingFromCol);
	}

	var timeout = maxGemsMissingFromCol * 2 * 100;
	game.time.events.add(timeout, boardRefilled);
}
var tutorial = true;

function boardRefilled() {
	var canKill = false;
	for (var i = 0; i < BOARD_COLS; i++) {
		for (var j = BOARD_ROWS - 1; j >= 0; j--) {
			var gem = getGem(i, j);

			if(gem === null) return;
			if (gem.dirty) {
				gem.dirty = false;
				canKill = checkAndKillGemMatches(gem) || canKill;
			}
		}
	}


	if(canKill) {
		removeKilledGems();
		dropGems();
		refillBoard()
		allowInput = false;
	} else {
		allowInput = true;
		if(tutorial == true){
			tutorial = false;
	tutorialHand = game.add.sprite(0, 0, "hand");
	tutorialHand.width = 100;
	tutorialHand.height = 100;
	tutorialHand.x = CANV_W/2-20;
	tutorialHand.y = CANV_H/2-190;
	tutorialHand.bringToTop();
	var tween = game.add.tween(tutorialHand).to( { y: tutorialHand.y +80 }, 1000, Phaser.Easing.inOut, true);

    //  And this tells it to repeat, i.e. fade in again 10 times.
    //  The 1000 tells it to wait for 1 second before restarting the fade.
    tween.repeat(200,1000)
	}
}
}

