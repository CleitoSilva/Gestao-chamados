﻿namespace api.Dto.Machines
{
    public class MachineUpdate
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Order { get; set; }
        public int IdLine { get; set; }
    }
}