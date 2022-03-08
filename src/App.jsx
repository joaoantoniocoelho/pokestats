import { useState } from "react";
import api from "./services/api";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  theme,
  ThemeProvider,
} from "@chakra-ui/react";

export function App() {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [typedPokemon, setTypedPokemon] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTypedPokemon = (event) => {
    setTypedPokemon(event.target.value.toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!typedPokemon) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.get(`/pokemon/${typedPokemon}`);
      setPokemon(response.data);
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError("We can't find the Pokémon! Sorry :(");
      window.alert("We can't find the Pokémon! Sorry :(");
      setIsLoading(false);
      setPokemon(null);
    }
  };

  const formatStr = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Flex
        width="100%"
        align="center"
        justifyContent="center"
        textAlign="center"
        mt={20}
      >
        <Box p={8} maxWidth="500px" maxW="90%">
          <Heading
            as="h1"
            fontFamily="'Smooch Sans', sans-serif;"
            color="white"
          >
            Welcome to PokeStats!
          </Heading>
          <Heading
            as="h2"
            mt={4}
            fontFamily="'Smooch Sans', sans-serif;"
            color="white"
          >
            Type the Pokémon name to search.
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mt={10} mb={5}>
              <Input
                type="text"
                placeholder="Pokémon name"
                size="lg"
                onChange={handleTypedPokemon}
                h={50}
                width="100%"
                maxW="100%"
                borderRadius={4}
                border="1px solid white"
                borderRadius="0.25rem"
                textAlign="center"
                mb={4}
                fontSize="24px"
                fontWeight="700"
                letterSpacing="0.1rem"
                color="white"
              />
            </FormControl>
            <Button
              backgroundColor="#fefefe"
              border="2px solid"
              borderColor="#000"
              variant="outline"
              type="submit"
              fontSize="24px"
              fontWeight="600"
              transition="all 0.25s"
              _hover={{
                filter: "brightness(0.9)",
              }}
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <span>Search Pokémon!</span>
              )}
            </Button>
          </form>
          {pokemon && (
            <div key={pokemon.id}>
              {isLoading ? (
                <span></span>
              ) : (
                <Flex
                  width="100%"
                  align="center"
                  justifyContent="center"
                  textAlign="center"
                >
                  <Flex flexDirection="column" justifyContent="center">
                    <Image
                      src={
                        pokemon.sprites.other["official-artwork"].front_default
                      }
                      alt={formatStr(pokemon.name)}
                      title={formatStr(pokemon.name)}
                      boxSize="250px"
                      mt={5}
                      mb={5}
                    />
                    <Box>
                      <Text fontSize="20px" color="white">
                        <strong>ID:</strong> #{pokemon.id}{" "}
                        <strong>Type:</strong>{" "}
                        {formatStr(pokemon.types[0].type.name)}
                      </Text>

                      <Text fontSize="20px" color="white">
                        <strong>Height:</strong> {pokemon.height * 10}cm.{" "}
                        <strong>Weight:</strong> {pokemon.weight / 10}kg.
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              )}
            </div>
          )}
        </Box>
      </Flex>
    </ThemeProvider>
  );
}
