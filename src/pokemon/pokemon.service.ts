// Packages
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

// Dto's
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

// Schemas
import { Pokemon } from './schemas/pokemon.schema';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    const data = {
      ...createPokemonDto,
      name: createPokemonDto.name.toLowerCase(),
    };

    return await this.pokemonModel.create(data);
  }

  async findAll() {
    return this.pokemonModel.find();
  }

  async findOne(id: string) {
    const pokemon: Pokemon | null = await this.pokemonModel.findById(id);
    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon: Pokemon | null = await this.pokemonModel.findByIdAndUpdate(
      id,
      updatePokemonDto,
      { new: true },
    );
    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }
    return pokemon;
  }

  async remove(id: string) {
    const pokemon: Pokemon | null =
      await this.pokemonModel.findByIdAndDelete(id);

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }
    return pokemon;
  }
}
