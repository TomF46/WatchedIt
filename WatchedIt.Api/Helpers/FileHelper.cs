namespace WatchedIt.Api.Helpers
{
    public static class FileHelper
    {
        public static string GetJSONData(string rootPath, string path)
        {
            string filePath = Path.GetFullPath(Path.Combine(rootPath, "Data/TestData", path));

            using (var r = new StreamReader(filePath))
            {
                string json = r.ReadToEnd();
                return json;
            }
        }
    }
}