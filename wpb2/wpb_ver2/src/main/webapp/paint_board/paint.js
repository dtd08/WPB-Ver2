/// html에서 canvas 불러오기
const canvases = document.getElementsByClassName("canvas");

let canvas = canvases[0];
let canvasIdx = 0;

let interval = setInterval(()=> {
    if (canvasIdx == canvases.length-1) {
        console.log("stop");
        showGoResult();
        clearInterval(interval);
    } else {
        canvas.className = "canvas";
        canvas = canvases[++canvasIdx];
        canvas.className += ' on';
        console.log(canvases[canvasIdx-1], canvas, canvasIdx);
    }
}, 3000);


const go = document.getElementById("go_result");
const goButton = document.getElementById("stop");

goButton.addEventListener("click", postResult);

function postResult() {
    console.log("post result");
}

function showGoResult() {
    go.style.display = "block";
}

/// context를 선언 및 canvas 기본 셋팅
/*
    캔버스 요소에서 픽셀에 접근할 수 있는 방법 = context를 이용하는 것이다. (context = 캔버스 안의 픽셀들)
    context는 context variable을 선언하여 생성한다.
*/
const ctx = canvas.getContext("2d"); // 캔버스 안에서 픽셀 컨트롤 설정
const INITIAL_COLOR = "#000";

// ctx.fillRect(0, 0, canvas.width, canvas.height); // 순서대로 x좌표, y좌표, 가로길이, 세로길이
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2;

canvas.width = 1200;
canvas.height = 800;


// canvas event 감지
let painting = false;

// 지우개 감지
let erasing = false;

// 브리쉬 & 지우개 사이즈
let brushSizeValue = 1;
let eraserSizeValue = 1;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX; // 마우스가 캔버스 안에서 움직일 때의 x값
    const y = event.offsetY; //         ''       y값

    /// 선 그리기 기능
    if (!painting) { // 마우스를 클릭하지 않은 채로 이동할 때
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineWidth = brushSizeValue;
    } else { // 마우스를 클릭한 채로 이동할 때
        if (erasing) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.lineWidth = eraserSizeValue;
        } else {
            ctx.globalCompositeOperation = "source-over";
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

/// rgb 조절 및 선택 기능
const choice = document.getElementById("choice");
const rgb = document.getElementsByClassName("rgb");
const saveColor = document.getElementById("save_color");
let red = 0;
let green = 0;
let blue = 0;

// rgb값 조절
Array.from(rgb).forEach(rgb => {
    const rgbSlider = rgb.querySelector("input");
    if (rgbSlider) {
        rgbSlider.addEventListener("input",() => {
            let rgbValue = rgbSlider.value;
            rgb.querySelector("label").innerHTML = rgbValue;

            if (rgbSlider.id == "red") red = rgbValue;
            else if (rgbSlider.id == "green") green = rgbValue;
            else blue = rgbValue;

            choice.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        });
    }
});


/// 색상 선택 기능
const colors = document.getElementsByClassName("color"); // 컬러칩 불러오기
let idx = 1;

// 선택한 색상 저장
saveColor.addEventListener("click", handleSaveColor);

// 컬러칩 배열 내 각 컬러들에 대한 클릭 이벤트 감지
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// 설정한 색상 저장하는 함수
function handleSaveColor() {
    colors[idx++].style.backgroundColor = choice.style.backgroundColor;
    if (idx >= colors.length) idx %= colors.length;
}


/// 브러쉬 사이즈 조절 기능
const brush = document.querySelector("#brush"); // 붓 그림  // 클릭 이벤트를 위한 호출
const brushSize = document.querySelector("#brush_size"); // 슬라이더  // 선 굵기 조정을 위한 호출
let nowColor = INITIAL_COLOR;

// 브러쉬 클릭 감지
brush.addEventListener("click", handleBrushClick);

// 원래 색상으로 변경하는 함수
function handleBrushClick() {
    erasing = false;
    ctx.strokeStyle  = nowColor;
}

// 슬라이더 인풋 감지
if (brushSize) {
    brushSize.addEventListener("input", handleBrushInput);
}

// 굵기 조정 함수
function handleBrushInput() {
    brushSizeValue = brushSize.value;
    ctx.lineWidth = sizeValue;
}

/// 채우기 기능
const bucket = document.querySelector("#bucket"); // 채우기 버튼
let filling = false; // paint 모드 -> fill || !paint 모드 -> paint 실행

if (bucket) { // 채우기 통 클릭 감지
    bucket.addEventListener("click", handleMode);
}

function fillCanvas() { // 채우기 함수
    ctx.fillRect(0, 0, canvas.width, canvas.height); // 캔버스 크기만큼 채우기
}

function handleMode() { // bucket 클릭 시 실행 함수
    const bucketTxt = document.querySelector("#bucket > span");
    if (filling === true) {
        filling = false;
    } else {
        filling = true;
        fillCanvas();
    }
}


/// 지우기 기능
const eraser = document.querySelector("#eraser > img");
const eraserSize = document.querySelector("#eraser_size")

eraser.addEventListener("click", handleEraser);

if (eraserSize) {
    eraserSize.addEventListener("input", handleEraserInput);
}

function handleEraser() {
    console.log("eraser click");
    erasing = true;
    nowColor = ctx.strokeStyle ; // 마지막 색상 저장
}

function handleEraserInput() {
    eraserSizeValue = eraserSize.value;
    ctx.lineWidth = sizeValue;
}


/// 저장 기능
const save = document.getElementById("save");

if (save) {
    save.addEventListener("click", saveImg);
}

function saveImg() {
    const img = canvas.toDataURL("image/png"); // 캔버스 데이터 -> 이미지
    const link = document.createElement("a"); // html에 a태그 생성
    link.href = img; // 링크에 이미지 할당
    const fileName = prompt("Enter the file name", "my_drawing");
    link.download = fileName || "download";
    link.click(); // 링크 클릭 이벤트 실행
}

function postImg() {
	
}