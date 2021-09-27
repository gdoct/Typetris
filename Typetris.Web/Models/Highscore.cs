using System.Runtime.Serialization;

namespace Typetris.Web
{
    [DataContract]
    public class HighScore
    {
        [DataMember(IsRequired = false)]
        public int rank { get; set; }
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public int score { get; set; }
        [DataMember(IsRequired = false)]
        public int level { get; set; }
        [DataMember(IsRequired = false)]
        public long date { get; set; }
    }


    [DataContract]
    public class UserHighScore
    {
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public int score { get; set; }
    }
}
