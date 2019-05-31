import random
import datetime as dt

out_filename = "init.yaml"

with open(out_filename, "w") as f:
    for i in range(0, 50):
        f.write("- model: api.image\n")
        f.write("  pk: %d\n" % i)
        f.write("  fields:\n")
        f.write("    title: %dth image\n" % (i + 1))

        image_id = random.randint(0, 1000)
        height = random.randrange(150, 350, 20)
        f.write("    url: https://picsum.photos/id/%d/200/%d\n" % (image_id, height))
        f.write("    width: 200\n")
        f.write("    height: %d\n" % height)

        f.write("    creation_date: %s\n" % str(dt.datetime.now()))
        f.write("\n")

