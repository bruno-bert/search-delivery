$containers = docker ps -a -q
foreach ($container in $containers) { docker rm $container -f }


$images = docker images -a -q
foreach ($image in $images) { docker image rm $image -f }

#this function deletes all images and containers from docker
