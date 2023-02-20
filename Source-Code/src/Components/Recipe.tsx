import { Button, Box, List, ListItem  } from "@mui/material";



export interface RecipeData{
    //title: string,
    //description: string,
    perfumes: string[],
    disclaimer: string,
    //steps: string[]
  }

  // This was also commented out:

  /*
 {props.steps.map((steps, index) => (
                <ListItem key={index}> {steps} </ListItem>
            ))}
  */

            //{props.description}

  function Recipe(props: RecipeData) { 


    return(
        <Box>
            {props.disclaimer}
            <List>
            {props.perfumes.map((perfume, index) => (
                <ListItem key={index}> {perfume} </ListItem>
            ))}

           

            </List>
        </Box>
    )
  }


  export default Recipe