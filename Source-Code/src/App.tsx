import { Button, Box, CircularProgress, Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import Recipe, {RecipeData} from "./Components/Recipe";
import IngredientOptions from "./Ingredients.json";
import ScentOptions from "./Scents.json";
import Image from './files/parfume_background.jpeg';
import { textAlign } from "@mui/system";





function App() {

    const [recipe, setRecipe] = useState({} as RecipeData)
    const [toLoad, setLoad] = useState(false)
    const [ingredients, setIngredients] = useState([] as string[])

    const func1 = () => {
        getRecipe()
        setLoad(true)
    }

    function loading(){
        return(
            <Box>
                <CircularProgress></CircularProgress>
            </Box>
            
        )
    }

    async function getRecipe() {

        const requestBody = JSON.stringify({
            ingredients:  ingredients
                
        })

        await fetch('http://localhost:8000/recipes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
            })
            .then((response) => response.json())
            .then((data) => {setRecipe(data)
                            setLoad(false)
                            console.log(data)
                            });

            

    }

    

    


    return (
        <>
            <Box sx={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                <Box sx={{
                backgroundImage: `url(${Image})`,
                backgroundSize: "cover",
                height: "100vh",
                opacity: 0.35,
                }}/> 
            
            <Box sx={{ position:'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                <Box sx={{textAlign: "center", fontSize: 30, padding: 2}}>Le Perfumé Merci</Box>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Autocomplete
                        multiple
                        filterSelectedOptions
                        disableCloseOnSelect
                        options={ScentOptions}
                        onChange={(event: any, newValue: string[]) =>{
                            setIngredients(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Pick the scents" />
                        )
                    }
                    sx = {{width: 0.7}}
                    />
                    <Button variant={"contained"} sx={{marginLeft: 2}}  onClick={func1}>Show me the magic</Button>
                </Box>

            
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", padding: 2}}>
                {toLoad && loading()}
                    {recipe.disclaimer &&
                        <Recipe 
                        //title={recipe.title}
                        //description={recipe.description}
                        disclaimer={recipe.disclaimer}
                        perfumes={recipe.perfumes}
                        //steps={recipe.steps}
                        />
                    }

                </Box>
            </Box>
        </Box>
        </>
    );
}

export default App;
