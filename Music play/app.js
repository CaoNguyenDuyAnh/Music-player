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
const ramdomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.play__list')
const switchBtn = $('.auth-form__switch')
const switchRegist = $('.auth-form__switch-regist')
const regist = $('.auth-form')
const login = $('.auth-form-login')
const openLogin = $('.login')
const openLogup = $('.logup')
const modal = $('.modal')
const playAll = $('.header-action-playall')
const volumelistener = $('#progress-volume')
const songPlaying = $('.active-playing')
const volumeIcon = $('.volume-icon')
const muted = $('.muted-icon')

const app = {
    currentIndex : 0,
    isPlaying: false,
    isRamdom: false,    
    isRepeat: false,
    isRegist: false,
    isLogin: true,
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
                <div class="play__list-song ${index === this.currentIndex ? 'active' :''}" data-index="${index}">
                    <div class="play__list-song-info">
                        <div class="number-song" style="margin: auto; padding: 0 10px 0 20px;">${index +1}</div>
                        <img class="active-playing" src="./img/output-onlinegiftools.gif" >
                        <div class="thumb" style= "background-image:url('${song.image}')"></div>
                        <div class="body-song">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                    </div>
                    <div class="play__list-song-option">
                        <i class="fas fa-heart"></i>
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
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000, 
            iterations: Infinity
        })
        cdThumbAnimate.pause()
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()

        }
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
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
            if(_this.isRamdom) {
                _this.playRamdomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
        }
        prevBtn.onclick = function(){
            if(_this.isRamdom) {
                _this.playRamdomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
        }
        ramdomBtn.onclick = function(e){
            _this.isRamdom = !_this.isRamdom
            ramdomBtn.classList.toggle('active', _this.isRamdom)
        }
        repeatBtn.onclick = function(e){
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        audio.onended =function() {
            if(_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.play__list-song:not(.active)')
            const optionNode = e.target.closest('.play__list-song-option')
            if(songNode || !optionNode){
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                if(optionNode){

                }
            }
        }

        openLogin.onclick = function(){
            modal.classList.add('open')
            login.classList.add('open')
            regist.classList.add('remove')
        }
        openLogup.onclick = function(){
            modal.classList.add('open')
            modal.classList.remove('none')
            login.classList.remove('open')
            regist.classList.remove('remove')
        }
        
        switchBtn.onclick = function() {
            regist.classList.add('remove')
            
            login.classList.add('open')
        }
        switchRegist.onclick = function() {
            regist.classList.remove('remove')
            
            login.classList.remove('open')
        }

        playAll.onclick = function(){
            audio.play()
        }
        volumelistener.onchange = function(e) {
            audio.volume = e.currentTarget.value /200
        }
        volumeIcon.onclick =function(){
            audio.volume = 0
            muted.classList.add('open')
            volumeIcon.classList.add('none')
        }

        muted.onclick = function() {
            audio.volume = 1
            muted.classList.remove('open')
            volumeIcon.classList.remove('none')
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
    playRamdomSong: function(){
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
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



