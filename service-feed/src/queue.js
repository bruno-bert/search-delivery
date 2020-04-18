import "dotenv/config";
import Queue from "./lib/Queue";
import TemplateEngine from "./lib/TemplateEngine";
TemplateEngine.start();
Queue.process();
