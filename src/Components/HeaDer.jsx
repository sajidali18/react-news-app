import React, { useEffect, useState } from 'react'
import './HeaDer.css'

function HeaDer() {
    const [data, setData] = useState([]);
    const [value, setvalue] = useState('');
    const [click, setclick] = useState(false)

    const handleclick = (category) => {
        setclick(true);
        setvalue(category);
    }

    const btnclick = () => {
        setclick(true)

    }
    const searchclick = (e) => {
        e.preventDefault();
        setvalue(e.target.value);
    }
    const fetchdata = async (value) => {
        try {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            let Response = await fetch(`https://newsapi.org/v2/everything?` +
                `q=${value}&` +
                `from=${year}-${month + 1}-${day - 2}&` +
                'pageSize=30&' +
                'language=en&' +
                'page=2&' +
                'sortBy=popularity&' +
                'apiKey=04fc7b09c2544a3aa3b3365502947193')
            let news = await Response.json();
            setData(news.articles);
            setvalue('');
            setclick(false);
        }
        catch (err) {
            console.log(err)
        }
    }
    if (click) {
        fetchdata(value)
        console.log(value)
    }
    useEffect(() => {
        fetchdata('heading');
    }, [])
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">News App</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#"><button onClick={() => handleclick('heading')}>home</button></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><button onClick={() => handleclick('sports')}>Sports</button></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><button onClick={() => handleclick('Apple')}>Apple</button></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><button onClick={() => handleclick('bitcoin')}>bitcoin</button></a>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="input" onChange={searchclick} />
                                <button className="btn btn-outline-success" type="submit" id="btn" onClick={btnclick}>Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mt-5">
                <div className="row align-items-center justify-content-center">
                    <h1 className='mb-5'>Welcome to News App ({data && data.length}) </h1>
                    {data && data.length > 0 && data.map((datas, index) => (
                        <div className="col-md-4 mx-4 mt-5" style={{ width: '18rem' }} key={index}>
                            <div className="card mb-4">
                                <img className="card-img-top" src={datas.urlToImage} alt="Card" />
                                <div className="card-body">
                                    <h5 className="card-title">{datas.title}</h5>
                                    <p className="card-text">{datas.description}</p>
                                    <a href={datas.url} target='_blank' className="btn btn-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

export default HeaDer