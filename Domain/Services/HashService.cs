using System;
using System.Security.Cryptography;

namespace Domain.Services
{
    public class HashService
    {
        private const int SALT_LENGTH = 16;
        private const int HASH_LENGTH = 20;
        private const int SALT_HASH_LENGTH = HASH_LENGTH + SALT_LENGTH;

        public string CreateHashedPassword(string password)
        {
            byte[] salt = CreateSalt();
            byte[] hash = CreateHash(password, salt);

            return CreateHashedPasswordString(hash, salt);
        }

        public bool AreMatchingPasswords(string databasePassword, string inputPassword)
        {
            byte[] hashBytesDatabase = Convert.FromBase64String(databasePassword);

            byte[] salt = new byte[SALT_LENGTH];
            Array.Copy(hashBytesDatabase, 0, salt, 0, SALT_LENGTH);

            byte[] hashBytesInput = CreateHash(inputPassword, salt);
            byte[] hashAndSaltFromInput = JoinHashAndSalt(hashBytesInput, salt);

            return IsValidHash(hashBytesDatabase, hashAndSaltFromInput);
        }

        private bool IsValidHash(byte[] firstHash, byte[] secondHash)
        {
            bool isValidHash = true;

            for (int i = SALT_LENGTH; i < SALT_HASH_LENGTH; i++)
                if (firstHash[i] != secondHash[i])
                {
                    isValidHash = false;
                    break;
                }

            return isValidHash;
        }

        private byte[] CreateHash(string password, byte[] salt)
        {
            const int NUM_OF_ITERATIONS = 10000;

            Rfc2898DeriveBytes pbkdf2 = new Rfc2898DeriveBytes(password, salt, NUM_OF_ITERATIONS);
            byte[] hash = pbkdf2.GetBytes(HASH_LENGTH);

            return hash;
        }

        private byte[] CreateSalt()
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[SALT_LENGTH]);

            return salt;
        }

        private string CreateHashedPasswordString(byte[] hash, byte[] salt)
        {
            byte[] hashBytes = JoinHashAndSalt(hash, salt);

            return Convert.ToBase64String(hashBytes);
        }

        private byte[] JoinHashAndSalt(byte[] hash, byte[] salt)
        {
            byte[] hashBytes = new byte[SALT_HASH_LENGTH];

            Array.Copy(salt, 0, hashBytes, 0, SALT_LENGTH);
            Array.Copy(hash, 0, hashBytes, SALT_LENGTH, HASH_LENGTH);

            return hashBytes;
        }
    }
}
