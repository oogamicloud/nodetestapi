// Load the modules we installed
const express = require('express')
const bodyparser = require('body-parser')
var toZalgo = require('to-zalgo')

// Tell express to run the webserver on port 3200
const app = express()
const port = process.env.port || 3200

// Use body-parser for unencodeing API request bodies
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

//{port}をアクセスポートに設定
app.listen(port, () => {
    console.log('running on port ${port}')
})

// Return "Hello World" when you go to http://localhost:3200
app.get('/', (req, res) => res.send('Hello world!'))


// リクエスト時にarrを読み込み、rundomItemFromArray関数からランダムに一つの配列要素をJsonで返す関数を作る
app.get('/magic-8-ball' , (req,res) => {
    //配列responsesの定義
    const responses = [
        'It is certain.',
        'It is decidedly so.',
        'Without a doubt.',
        'Yes - definitely.',
        'You may rely on it.',
        'As I see it, yes.',
        'Most likely.',
        'Outlook good.',
        'Yes.',
        'Signs point to yes.',
        'Reply hazy, try again.',
        'Ask again later.',
        'Better not tell you now.',
        'Cannot predict now.',
        'Concentrate and ask again.',
        "Don't count on it.",
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.'
    ]

    //ステータス200OKのときに、jsonを返すメソッド
    res.status(200).json({
        prediction: randomItemFromArray(responses)
    })
})

// Return Zalgo-ified text for http://localhost:3200/to-zalgo
//curl -d '{"text":"Sphinx of black quartz, judge my vow"}' -H "Content-Type: application/json" http://localhost:3200/to-zalgo
// Input:   {"text": "your text here"}
// Returns: {"code": 200, "original": "your text here", "zalgo": "zalgo-ified text"}
app.post('/to-zalgo', (req, res) => {
    // Return 400 if the input doesn't contain a "text" element
    if (req.body.text === undefined) {
        res.status(400).json({
            "code": 400,
            "message": "Missing 'text' argument"
        })
        return
    }

    original = req.body.text
    zalgo = toZalgo(original)

    res.status(200).json({
        "code": 200,
        "original": original,
        "zalgo": zalgo
    })

})

// arrayを入力するとそのarrayからrandomでその配列要素を返す関数
function randomItemFromArray(arr){
    return arr[Math.floor(Math.random() * arr.length)]
}