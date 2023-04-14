import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UserMapper } from './mapper/UserMapper';
import { Message } from '../common/response/message';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private userMapper: UserMapper,
  ) {}

  /** * Finds the user with the given id
   *
   * @param {number} id Id of the user to find
   *
   * @throws NotFoundException If no user with the given id was found
   * @return {Promise<User>} Data of the user
   */

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  /** * Finds the user with the given email
   *
   * @param {string} email email of the user to find
   *
   * @throws NotFoundException If no user with the given id was found
   * @return {Promise<UserInfoDto>} Data of the user
   */

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user)
      throw new NotFoundException(
        `A user with the given username wasn't found`,
      );
    return user;
  }

  /** *  Create a new user
   * @param newUserData
   *
   * @throws HttpException If a user with the given email was found
   * @return {Promise<UserInfoDto>} The created user's data
   */
  async create(newUserData: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOneBy({
      email: newUserData.email,
    });
    if (existing)
      throw new HttpException(
        'A user with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    const user = this.userRepository.create(newUserData);
    return this.userRepository.save(user);
  }

  async updateUserPassword(id: number, newPassword: string) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user.password = newPassword;
    return this.userRepository.save(user);
  }

  async updateUserInfo(id, updatedUserInfo: UpdateUserInfoDto) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return this.userRepository.save({ id: user.id, ...updatedUserInfo });
  }

  async deleteUserById(id) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.remove(user);
  }

  async findAll() {
    return this.userRepository.find({});
  }

  async getUser(id) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return this.userMapper.entityToDto(user);
  }

  async putUserInfo(
    id,
    userInfo: UpdateUserInfoDto,
  ): Promise<Message<UpdateUserInfoDto>> {
    const updatedUser = await this.updateUserInfo(id, userInfo);
    return new Message(
      'User data updated successfully',
      this.userMapper.entityToDto(updatedUser),
    );
  }

  async patchUserPassword(id, password: string) {
    await this.updateUserPassword(id, password);
    return new Message('Password updated successfully');
  }

  async getAllUsers() {
    const users = await this.findAll();
    return this.userMapper.entitiesToDto(users);
  }

  async deleteUser(id): Promise<Message> {
    await this.deleteUserById(id);
    return new Message(`User #${id} was deleted successfully`);
  }
}