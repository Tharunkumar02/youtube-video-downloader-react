import React, { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [url, setUrl] = useState('')
  const [ytVideo, setYtVideo] = useState('')
  const [videos, setVideos] = useState([])
  const [audios, setAudios] = useState([])

  const handleSubmit = () => {
    const options = {
      method: 'GET',
      url: 'https://youtube-video-and-shorts-downloader.p.rapidapi.com/',
      params: { url: url },
      headers: {
        'X-RapidAPI-Key': 'YOUR_API_KEY',
        'X-RapidAPI-Host': 'youtube-video-and-shorts-downloader.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      // console.log(response.data);
      setYtVideo(response.data)
      setVideos(response.data.video)
      // console.log(response.data.video)
      setAudios(response.data.audio)
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <div className="App">
      <h1>Youtube Video Downloader</h1>
      <h4>Paste Your YouTube URL and Enjoy Your Download</h4>
      <input className='url-input' type="text" placeholder="Enter Youtube Video URL" onChange={(e) => setUrl(e.target.value)} value={url} />
      <button onClick={handleSubmit}>Download</button>
      {ytVideo ? <h2>{ytVideo.title}</h2> : null}
      <div className='flex'>
        {
          ytVideo ? <div>
            <img src={ytVideo.thumbnail_url} alt="thumbnail" className='thumbnail' />
          </div> : null
        }
        <div className='results'>
          <div className='result-videos'>
            {ytVideo ? <h3><u>Video Results</u></h3> : null}
            {
              videos.map((video, index) => {
                return (
                  <div className='result-videos' key={index}>
                    <table>
                      <tr>
                        <th>{video.quality}</th>
                      </tr>
                      <tr>
                        <a href={video.url} className='button' download target='_blank'>Download</a>
                      </tr>
                    </table>
                  </div>
                )
              })
            }
          </div>
          <div className='result-audios'>
            {ytVideo ? <h3><u>Audio Results</u></h3> : null}
            {
              ytVideo ? (
                <div className='result-audios'>
                  <table>
                    <tr>
                      <th>{audios.type}</th>
                    </tr>
                    <tr>
                      <a href={audios.url} target='_blank' className='button' download>Download</a>
                    </tr>
                  </table>
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
