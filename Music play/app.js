const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading = $('.body-playing .title')
const cdThumb = $('.thumb-and-body .thumb')
const authorPlaying = $('.thumb-and-body .author-playing')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.btnAndSeek')
const progress = $('#progress-seek')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const app = {
    currentIndex : 0,
    isPlaying: false,
    isRamdom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Cưới thôi',
            singer: 'Bray x Masew',
            path: './audio/CuoiThoi-MasiuMasew-7066112.mp3',
            image: './img/cuoithoi.jpg'
        },
        {
            name: 'Cho tôi lang thang',
            singer: 'Đen x Ngọt',
            path: './audio/Cho-Toi-Lang-Thang-Ngot-Den.mp3',
            image: './img/chotoilangthang.jpg'
        },
        {
            name: 'Độ tộc',
            singer: 'Phúc Du x Masew x Pháo x Độ Mixi',
            path: './audio/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3',
            image: './img/DoToc.jpg'
        },
        {
            name: 'Ai biết',
            singer: 'Wean',
            path: './audio/AiBiet-WEAN-6061846.mp3',
            image: './img/AiBiet.jpg'
        },
        {
            name: 'Phiêu bồng',
            singer: 'Tofu',
            path: './audio/PhieuBong-Tofu-6041401.mp3',
            image: './img/PhieuBong.jpg'
        },
        {
            name: 'Sống cho hết đời thanh xuân',
            singer: 'Dick x Xám x Tuyết',
            path: './audio/SongChoHetDoiThanhXuan-DickXamTuyet-5708079.mp3',
            image: './img/schdtx.jpg'
        },
        {
            name: 'Retrograde',
            singer: 'Wean x Naomi',
            path: './audio/Retrograde-WEANNaomi-5833952.mp3',
            image: './img/Retrograde.jpg'
        },
    ],
    render: function() {
        const htmls = this.songs.map((song, index) =>{
            return`
                <div class="play__list-song">
                    <div class="play__list-song-info">
                        <div class="thumb" style= "background-image:url('${song.image}')"></div>
                        <div class="body-song">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                    </div>
                    <div class="play__list-song-option">
                        <i class="far fa-heart icon-playlist"></i> 
                        <i class="fas fa-ellipsis-h icon-playlist"></i>
                    </div>
                </div>
            `   
        })
        $('.play__list').innerHTML = htmls.join('')
        
    },
    defineProperties : function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    }, 
    handleEvents:function(){
        const _this = this
        playBtn.onclick = function (){
            if(_this.isPlaying){
                audio.pause()
            } else {
                audio.play()
            }
        }
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
        }
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
        }
        audio.ontimeupdate = function(){
            const progressPercent = Math.floor(audio.currentTime / audio.duration *100)
            progress.value = progressPercent
        }
        progress.onchange = function(e) {
                    const seekTime = audio.duration / 100 * e.target.value
                    audio.currentTime = seekTime
        }
        nextBtn.onclick = function(){
            _this.nextSong()
            audio.play()
        }
        prevBtn.onclick = function(){
            _this.prevSong()
            audio.play()
        }
    },
    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        authorPlaying.textContent = this.currentSong.singer
    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    start: function() {
        //Định nghĩa các thuộc tính cho object
        this.defineProperties()

        this.handleEvents()

        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        //Render playlist
        this.render()
    }

    
}
app.start()

