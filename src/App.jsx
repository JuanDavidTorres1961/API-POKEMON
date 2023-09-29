//Hooks
import { useState , useEffect } from "react";
//Components
import {Button} from "./Components/Button"
import { Card } from "./Components/Card";
//Styles
import './sass/App.scss'
//Icons
import { TiArrowRightOutline , TiArrowLeftOutline } from "react-icons/ti";



const App = () =>{

    const [pokemonId , setPokemonId] = useState(0)
    const [pokemonEvolutions , setPokemonEvolutions] = useState ([])
    

    useEffect(()=>{
        getEvolutions(pokemonId); 
         
    },[pokemonId])

    async function getEvolutions(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        const data = await response.json()

        let pokemonEvoArray = []

        let pokemonLv1 = data.chain.species.name
        let pokemonLv1Imgs = await getPokemonimgs(pokemonLv1)
        pokemonEvoArray.push([pokemonLv1, pokemonLv1Imgs])

        if (data.chain.evolves_to.length !== 0) {
            let pokemonLv2 = data.chain.evolves_to[0].species.name;
            let pokemonLv2Imgs = await getPokemonimgs(pokemonLv2)
            pokemonEvoArray.push([pokemonLv2, pokemonLv2Imgs])

            if (data.chain.evolves_to[0].evolves_to.length !== 0) {
                let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name;
                let pokemonLv3Imgs = await getPokemonimgs(pokemonLv3)
                pokemonEvoArray.push([pokemonLv3, pokemonLv3Imgs])
                
            }
        }
        setPokemonEvolutions(pokemonEvoArray)

    } 

    async function getPokemonimgs(name){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data = await response.json()
        return data.sprites.other['official-artwork'].front_default;
    }


    function prevClick(){
        if (pokemonId === 1) {
            setPokemonId (1)
        }else{
            setPokemonId (pokemonId - 1)
        }
    }

    function nexClick() {
        setPokemonId (pokemonId + 1)
    }



    return(
        <div className="app">
            <div className={`card-container card${pokemonEvolutions.length}`}>
                {pokemonEvolutions.map(pokemon =>
                    <Card 
                        key={pokemon[0]}
                        name ={pokemon[0]}
                        img ={pokemon[1]}
                    />
                    )}
            </div>

            <div className="buttons-container">
                <Button 
                icon={<TiArrowLeftOutline/>} 
                handleClick={prevClick}
                />
                
                <Button
                icon={<TiArrowRightOutline/>}
                handleClick={nexClick}
                />
            </div>
        </div>
    )
}

export {App}