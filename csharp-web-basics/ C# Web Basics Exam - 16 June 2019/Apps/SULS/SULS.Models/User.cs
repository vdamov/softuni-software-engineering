﻿using System.ComponentModel.DataAnnotations;

namespace SULS.Models
{
    public class User
    {
        public string Id { get; set; }
        [StringLength(20)]
        [Required]
        public string Username { get; set; }
        [Required]

        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}