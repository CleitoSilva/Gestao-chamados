﻿namespace api.Dto.Enterprises
{
    public class EnterpriseUpdate
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
    }
}
