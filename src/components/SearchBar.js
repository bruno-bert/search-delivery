import React from 'react'

const SearchBar = () => {

    const search = (e)=>{
        e.preventDefault()
    }
    
    return (
        <div className="search-bar row justify-content-center mb-5">
        <div className="col-12">
            <form className="card card-sm">
                <div className="card-body row no-gutters align-items-center">
                    <div className="col-auto  mr-3">
                        <i className="fa fa-search h4 text-body"></i>
                    </div>
                  
                    <div className="col">
                        <input className="form-control form-control-lg form-control-borderless" type="search" 
                        placeholder="Procurar Estabelecimentos" />
                    </div>
                  
                    <div className="col-auto ml-3">
                        <button onClick={search} className="btn btn-lg btn-primary" type="submit">Procurar</button>
                    </div>
                  
                </div>
            </form>
        </div>
     
    </div>
    )
}

export default SearchBar
