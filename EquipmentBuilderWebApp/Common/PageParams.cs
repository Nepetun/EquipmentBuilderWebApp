using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Common
{
    public class PageParams
    {
        private const int MaxPageSize = 10; // aktualnie pokazanie 10 obiektów na stornę
        public int PageNumber { get; set; } = 1;

        private int pageSize = 5;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

    }
}
