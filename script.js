'use strict';

// Danh sách từ khóa
const words = ['nhỏ giọt', 'sao chổi', 'tinh dầu', 'mát lòng', 'thiện cảm', 'đoan trang', 'phất trần', 'công tử', 'đài trang', 'chăm chút', 'trống vắng'];
const wordList = [
    {anwser: 'nhỏ giọt', hint: 'Ví cách cung cấp nay một ít, mai một ít và quá chậm'},
    {anwser: 'sao chổi', hint: 'Một hiện tượng thiên nhiên, mọi người thường ước khi nhìn thấy!'},
    {anwser: 'tinh dầu', hint: 'Có mùi thơm,thường dùng để xông hơi!'},
    {anwser: 'mất lòng', hint: 'Có điều không bằng lòng, không hài lòng vì một hành vi, thái độ không phải nào đó'},
    {anwser: 'thiện cảm', hint: 'Tình cảm tốt, ưa thích đối với ai đó.'},
    {anwser: 'đoan trang', hint: 'Chỉ người phụ nữ đứng đắn và nghiêm trang'},
    {anwser: 'phất trần', hint: 'Vật dụng gắn liền với nhân vật "ông Bụt"!'},
    {anwser: 'công tử', hint: 'Con trai nhà quan, nhà quyền quý thời phong kiến!'},
    {anwser: 'chăm chút', hint: 'Chú ý đến từng li từng tí, để cho lúc nào cũng ở trong tình trạng tốt nhất.'},
    {anwser: 'trống vắng', hint: 'Vì thiếu mất đi cái thường phải có, gây cảm giác buồn và trống trải.'},
    {anwser: 'rêu rao', hint: 'Nói to cho nhiều người biết, nhằm mục đích xấu.'},
    {anwser: 'lô cốt', hint: 'Công sự xây đắp thành khối vững chắc, dùng để phòng ngự.'},
    {anwser: 'giờ giấc', hint: 'Thời gian nhất định dành cho từng việc khác nhau trong ngày.'},
    {anwser: 'mưu sinh', hint: 'Tìm cách để sinh sống.'},
    {anwser: 'quần quật', hint: 'Nặng nhọc, vất vả liên tục và kéo dài, tựa như không có lúc nghỉ.'},
    {anwser: 'đồng áng', hint: 'Việc làm nông nói chung.'},
    {anwser: 'thư kí', hint: 'Một nghề.'},
    {anwser: 'giặt giũ', hint: 'Hành động làm sạch quần áo bẩn.'},
    {anwser: 'khám phá', hint: 'Tìm ra, phát hiện ra cái còn ẩn giấu, cái bí mật..'},

];

// State variables
let currentWord = ''; //biến chứa đáp án đúng
let scrambledWord = '';// biến xáo trộn
let hintWord = '';
let timer; // Timer variable
let timeLeft = 40; // Countdown time in seconds
let correctAnswer = 0;//biến đếm câu trả lời đúng
let score = 0; // biến cập nhật điểm
let hintUsed = false; // trạng thái sử dụng của nút gợi ý ban đầu là
let previousWord = null; //Lưu trữ đáp án từ vòng chơi trước.

// Khởi tạo đối tượng Audio cho nhạc nền
const backgroundMusic = new Audio('vuatiengviet.m4a');
backgroundMusic.loop = true; // Lặp lại nhạc
backgroundMusic.volume = 0.5; // Đặt âm lượng
// Hàm bật nhạc nền
const playMusic = () => {
    backgroundMusic.play();
};

// Hàm tắt nhạc nền
const stopMusic = () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // Đặt lại về đầu
};

// hàm chọn ngẫu nhiên từ ,xáo trộn và ghép lại thành chuỗi
const shuffleWord = (word) => {
    let shuffled;
    do {
        // Xáo trộn ngẫu nhiên
        shuffled = word.split('').sort(() => Math.random() - 0.5).join('');
    } while (shuffled === word); // Lặp lại nếu từ xáo trộn giống đáp án gốc
    return shuffled;
};

// chọn từ đã được xáo trộn từ hàm shuffleWord
const generateNewWord = () => {
    let newWord;
    do {
        //chọn ngãu nhiên 1 từ trong danh sách
        newWord = wordList[Math.floor(Math.random() * wordList.length)];
    } while (newWord === previousWord);//lặp lại nếu bị trùng với vong trước
    currentWord = newWord;
    scrambledWord = shuffleWord(currentWord.anwser);
    previousWord = currentWord; // cập nhật biến previouWord để kiểm tra vòng sau tránh lặp lại
    hintUsed = false;
    document.querySelector('.scrambled-word').textContent = scrambledWord;
    document.querySelector('.message').textContent = 'Bắt đầu...';
    document.querySelector('.guess-input').value = '';
    document.querySelector('.container').style.backgroundColor = '#fff';
    startTimer();

};


// hàm đếm thời gian
const startTimer = () => {
    timeLeft = 30;
    document.querySelector('.timer').textContent = `Time left: ${timeLeft}s`;
    playMusic();
    // Xóa mọi bộ hẹn giờ hiện có để tránh chồng chéo
    clearInterval(timer);

    // khởi tạo thời gian mới
    timer = setInterval(() => {
        timeLeft--;
        document.querySelector('.timer').textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.querySelector('.message').textContent = '⏰ Thời gian đã hết! Hãy cố gắng lên!';
            document.querySelector('.guess-input').disabled = true; // Disable input
            document.querySelector('.check-button').disabled = true; // Disable check button
            stopMusic();
        }
    }, 1000);
};
//hàm bắt đầu game
const startGame = () => {
    generateNewWord();
    startTimer();
    playMusic();
    document.querySelector('.start-button').disabled = true;
    document.querySelector('.guess-input').disabled = false;
    document.querySelector('.check-button').disabled = false;
    document.querySelector('.hint-button').disabled = false;
    document.querySelector('.reset-button').disabled = false;


}


// hàm khởi động lại game
const resetGame = () => {
    document.querySelector('.guess-input').disabled = false;
    document.querySelector('.check-button').disabled = false;
    score = 0;
    correctAnswer = 0;
    document.querySelector('.score').textContent = `Điểm: ${score}`;
    document.querySelector('.correct-answer').textContent = `Câu trả lời đúng: ${correctAnswer}`;
    startTimer();
    playMusic();

};


// Hàm kiểm tra câu trả lời
const checkGuess = () => {
    const playerGuess = document.querySelector('.guess-input').value.toLowerCase();
    if (!playerGuess) {
        document.querySelector('.message').textContent = '⛔ Hãy nhập câu trả lời';
        return;
    }
    if (playerGuess === currentWord.anwser) {

        correctAnswer++;
        if (hintUsed) {
            score += 5;
        } else {
            score += 10;
        }
        // clearInterval(timer);
        document.querySelector('.score').textContent = `Điểm: ${score}`;
        document.querySelector('.correct-answer').textContent = `Câu trả lời đúng: ${correctAnswer}`;
        generateNewWord();
        // Fireworks effect with Canvas Confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {x: 0.5, y: 0.5}
        });


        clearInterval(timer); // Stop the timer when player wins
        document.querySelector('.score').textContent = `Điểm: ${score}`;
        document.querySelector('.correct-answer').textContent = `Câu trả lời đúng: ${correctAnswer}`;
        document.querySelector('.guess-input').disabled = true;
        document.querySelector('.check-button').disabled = true;
    } else {
        document.querySelector('.message').textContent = '❌ Sai rồi!';

    }
};

// sự kiện các nút
document.querySelector('.check-button').addEventListener('click', checkGuess);
document.querySelector('.reset-button').addEventListener('click', resetGame);
document.querySelector('.start-button').addEventListener('click', startGame);

// người dùng có thể ấn enter thay vì click nút check
document.querySelector('.guess-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

//hiển thị gợi ý
function showHint() {
    hintUsed = true;
    Swal.fire({
        title: currentWord.hint,
        imageUrl: "./bongden.png",
        imageWidth: 80,
        imageHeight: 90,
        imageAlt: "Hint"
    });
}

// cấm nhập
function inputBan() {
    document.querySelector('.guess-input').disabled = true; // Khóa input
    document.querySelector('.check-button').disabled = true; // Khóa nút check
    document.querySelector('.reset-button').disabled = true;//khóa nút reset
    document.querySelector('.hint-button').disabled = true;//khóa nút gợi ý
}

inputBan();