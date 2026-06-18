# aavegotchi-shared-code
This repo contains code that is referenced by multiple Aavegotchi projects including Realm constants, schema, json, and utils.

**Git Submodule Caveats**
Git submodules get a bad rap as they can be quite frustrating to set up and use. They often don't work the way you might expect but if you follow some key details on how they are designed to be used  they integrate just fine and there is no better substitute for shared resources.

Before checking out an Aavegotchi git repo or branch that references this submodule you'll want to run this on the command line to make git submodules much more frustration free (it's a global setting so you only need to run this once from any directory)
`git config --global submodule.recurse true`

This flag makes it so that anytime git fetches a repo or branch that includes a submodule it automaticaly loads the submodule's project data into the submodule folder. This is something you'd expect it would do automatically but nope(!) it loads an empty placeholder directory. This setting also ensures the submodule automagically gets updated when you change branches instead of leaving untracked files from the previous branch.

The other key thing to note is that git submodules are typically referenced in parent projects in a detached state meaning they won't update automatically when you `git pull` the parent repo. This is actually a good thing because we don't want random updates to submodules breaking deploys. You can just ~`git pull --recurse-submodules`~ `git submodule update --recursive --remote` whenever you want to pull the latest submodule code into your parent project. That updates the git commit hash pointer for the submodule as a new change you can commit with the rest of your code. So production can point to a certain version of the submodule and staging can point to another, etc. In this way the workflow is more similar to how you would update package versions in package.json compared to managing branches in the parent repo.

**Adding a Repo**
This repo is likely already added as a git submodule to the Aavegotchi project you are working on as `shared_code` under the root project folder. If you're adding it to a new repo you can stick to this naming convention and add it like so:
`git submodule add git@github.com:aavegotchi/aavegotchi-shared-code.git shared_code`

**Initializing the submodule**
If you've updated `git config` above this step may not be needed. If you have an empty `shared_code` folder in your parent project than this step is definitely needed. From the PWD of your parent project folder run:

`git submodule update --init --recursive`

After that, to get the latest version, run 

`git submodule update --recursive --remote`
* note `git pull --recurse-submodules` is the newest and preferred option to do the same thing but doesn't work here, I believe because our master branch is not named `master` but `main`.
Save yourself some trouble in having to look up this command frequenty and just created an alias: `git config --global alias.pull-sub 'submodule update --recursive --remote` then you only need to call `git pull-sub` going forward.


 # Content overview:
 - `binarySchemas.js` : Contains the schemas for the binary encoding of server -> client messages

# README about binary schemas:

Let's take the example of the `enterDataSchema`. When a player enters an AOI, he receives a bunch of data about things that are in that AOI in an enter message. The schema of it is in `binarySchemas.js -> enterDataSchema`.

```
binarySchemas.enterEventSchema = {
  numbers: ['channel'],
  objects: {
    data: {
      arrays: {
        installation: binarySchemas.installationSchema,
        item: binarySchemas.itemsSchema,
        missile: binarySchemas.positionSchema, // same schema for new and moving missiles
        parcel: binarySchemas.parcelsSchema,
        player: binarySchemas.playersSchema,
      },
    },
  },
};
```

This schema basically means: "an enter message contains only 5 arrays, an array of installations, one of items (alchemicas), one of missiles, one of parcels and one of players. For each array, you need to indicate another schema which is the schema of the elements that will be stored in the array.

Each other schema object behaves the same, indicating for each type of values what are their keys, and in the case of arrays and objects, the schemas needed to encode the values.
