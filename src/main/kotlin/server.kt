import spark.*
import java.io.File

fun main(args: Array<String>) {
    Spark.port(9000)
    Spark.externalStaticFileLocation("static")
    Spark.staticFiles.expireTime(0)

    Spark.get("/", Route { request, response ->
        val text = File("static/index.html").readText()
        text
    })
}