<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WPB Ver 2</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>
    <div id="wrap">
        <main id="main">
            <div id="go_result">
                <p><i>STOP!</i></p>
                <button id="stop">결과 보기</button>
            </div>
            <div id="canvas_wrap">
                <canvas class="canvas on"></canvas>
                <canvas class="canvas"></canvas>
                <canvas class="canvas"></canvas>
                <canvas class="canvas"></canvas>
            </div>
        </main>
        <aside id="aside">
            <nav id="menu">
                <div id="option_wrap">
                    <div class="option" id="shapes_n_tools">
                        <div id="tools">
                            <div class="tool" id="brush">
                                <img src="Imgs/brush.png" alt="브러쉬">
                                <input type="range" name="brush_size" id="brush_size" min="1" max="100" value="2">
                            </div>
                            <div class="tool" id="eraser">
                                <img src="Imgs/eraser.png" alt="지우개">
                                <input type="range" name="eraser_size" id="eraser_size" min="1" max="100" value="2">
                            </div>
                            <div class="tool" id="bucket">
                                <img src="Imgs/bucket.png" alt="페인트통">
                            </div>
                        </div>
                        <div id="shapes">
                            <div class="shape line"></div>
                            <div class="shape square"></div>
                            <div class="shape circle"></div>
                            <div class="shape trangle"></div>
                        </div>
                    </div>
                    <div class="option" id="choice_color">
                        <div id="colors">
                            <div class="color" style="background-color: #000;"></div>
                            <div class="color"style="background-color: #fff;"></div>
                            <div class="color"></div>
                            <div class="color"></div>
                            <div class="color"></div>
                            <div class="color"></div>
                            <div class="color"></div>
                            <div class="color"></div>
                            <div class="color"></div>
                            <div class="color"></div>
                            <div class="color"></div>
                            <div class="color"></div>
                            <div class="color"></div>
                            <div class="color"></div>
                            <div class="color"></div>
                        </div>
                        <div id="rgb_choice">
                            <div id="choice" style="background-color: #000;"></div>
                            <div id="rgb">
                                <div class="rgb">
                                    <span>R</span>
                                    <input type="range" id="red" min="0" max="255" value="0">
                                    <label for="red">0</label>
                                </div>
                                <div class="rgb">
                                    <span>G</span>
                                    <input type="range" id="green" min="0" max="255" value="0">
                                    <label for="green">0</label>
                                </div>
                                <div class="rgb">
                                    <span>B</span>
                                    <input type="range" id="blue" min="0" max="255" value="0">
                                    <label for="blue">0</label>
                                </div>
                            </div>
                            <button id="save_color">색상 저장</button>
                        </div>
                    </div>
                </div>

                <div id="btn-wrap">
                    <button id="save">이미지 저장</button>
                    <button id="post">게시하기</button>
                </div>
            </nav>
        </aside>
        <footer id="footer">
            <p id="made_by">Draw Freely in Web Paint Board 2- Made by 이서영</p>
            <p id="source">페인트 통 / 플로피 디스크 / 붓 아이콘 제작자: Freepik - Flaticon
            </p>
        </footer>
    </div>
</body>
</html>