﻿using api.Base;

namespace api.Models
{
    public class User : Entity
    {
        public Guid Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public Guid IdEnterprise { get; set; }

        public Enterprise? Enterprise { get; set; } 
    }
}
