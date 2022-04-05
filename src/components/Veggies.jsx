import { useEffect,useState } from "react";
import styled from "styled-components";
import {SplideSlide} from '@splidejs/react-splide';
import { Splide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import {Link} from 'react-router-dom';

import React from 'react'

function Veggies() {
  const [veggie,setVeggi]=useState([])

useEffect(()=>{
    getVeggi();
},[])

const getVeggi = async ()=>{

   
        const api = await fetch (`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
        
        const data = await api.json();
        localStorage.setItem("veggie", JSON.stringify(data.recipes));
        setVeggi(data.recipes);
    


    
};
  return (
    <div>
                <Wrapper>
                    <h3> Our Vegetarian Picks</h3>
                    
                    <Splide options={{
                        perPage:3,
                        arrows: false,
                        pagination: false,
                        drag: "free",
                        gap:"2rem",
                    }}>
                    {veggie.map((recipe)=>{
                        return(
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={'/recipe/'+recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
                                        <Gradient/>
                                    </Link>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                    </Splide>
                </Wrapper>
            
     
    </div>
  )
}
const Wrapper = styled.div`
margin: 4rem 0rem;

`;

const Card = styled.div`
min-height:16rem;
border-radius:2rem;
overflow:hidden;





img{
    border-radius:2rem;
    position:absolute;
    left:0;
    height:100%;
    width:100%;
    object-fit:;

}
p{
    position:absolute;
    z-index:10;
    left:50%;
    bottom:0%;
    transform:translate(-50%, 0%);
    color:white;
    width:100%;
    text-align: center;
    font-weight:600;
    font-size:1rem;
    height:40%;
    display: flex;
    justify-content: center;
    align-items:center;
}
`;

const Gradient = styled.div`
z-index:3;
position:absolute;
width:100%;
height:100%;
border-radius:2rem;
background:linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;


export default Veggies