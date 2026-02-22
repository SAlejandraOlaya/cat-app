import { registerUser, loginUser } from '../services/user.service';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

jest.mock('../models/user.model');
jest.mock('bcrypt');

describe('User Service', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {

        it('should register a new user successfully', async () => {
            const mockUser = { name: 'Alejandra', email: 'ale@test.com', password: '123456' };
            const mockUserResponse = { name: 'Alejandra', email: 'ale@test.com' };

            (User.findOne as jest.Mock).mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');

            const mockSave = jest.fn().mockResolvedValue(undefined);
            const mockToObject = jest.fn().mockReturnValue({ name: 'Alejandra', email: 'ale@test.com', password: 'hashedPassword123' });

            (User as unknown as jest.Mock).mockImplementation(() => ({
                ...mockUser,
                password: 'hashedPassword123',
                save: mockSave,
                toObject: mockToObject,
            }));

            const result = await registerUser(mockUser);

            expect(User.findOne).toHaveBeenCalledWith({ email: 'ale@test.com' });
            expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
            expect(mockSave).toHaveBeenCalled();
            expect(result).toEqual(mockUserResponse);
        });

        it('should throw an error if user already exists', async () => {
            const mockUser = { name: 'Alejandra', email: 'ale@test.com', password: '123456' };

            (User.findOne as jest.Mock).mockResolvedValue({ email: 'ale@test.com' });

            await expect(registerUser(mockUser)).rejects.toThrow('User already exists');
        });
    });

    describe('loginUser', () => {

        it('should login successfully with valid credentials', async () => {
            const mockUserFromDB = {
                name: 'Alejandra',
                email: 'ale@test.com',
                password: 'hashedPassword123',
                toObject: jest.fn().mockReturnValue({
                    name: 'Alejandra',
                    email: 'ale@test.com',
                    password: 'hashedPassword123',
                }),
            };

            (User.findOne as jest.Mock).mockResolvedValue(mockUserFromDB);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            const result = await loginUser('ale@test.com', '123456');

            expect(User.findOne).toHaveBeenCalledWith({ email: 'ale@test.com' });
            expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashedPassword123');
            expect(result).toEqual({ name: 'Alejandra', email: 'ale@test.com' });
        });

        it('should throw an error if user is not found', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);

            await expect(loginUser('noexiste@test.com', '123456')).rejects.toThrow('Invalid credentials');
        });

        it('should throw an error if password is invalid', async () => {
            const mockUserFromDB = {
                email: 'ale@test.com',
                password: 'hashedPassword123',
            };

            (User.findOne as jest.Mock).mockResolvedValue(mockUserFromDB);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(loginUser('ale@test.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
        });
    });
});
