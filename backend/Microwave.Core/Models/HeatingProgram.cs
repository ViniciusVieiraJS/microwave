using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microwave.Core.Models
{
    public class HeatingProgram
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Food { get; set; } = string.Empty;
        public int PowerLevel { get; set; }
        public int Duration { get; set; }
        public string HeatingCharacter { get; set; } = string.Empty;
        public string ComplementaryInformation { get; set; } = string.Empty;


    }
}
