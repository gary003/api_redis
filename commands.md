## string dataType

# Creates a new "key-value" pair

set <key> <value>

# Get a key-value pair

get <key>

# Set special conf

set conf:port 8080
set conf:name serverName

# Create an expiration interval on a key:value (in seconds)

expire <key> <numberOfSec>

# Get the time left before expiration

ttl <key>

# Increment a key value (+1) (key has to be an integer)

incr <key>

# Set a key with value and expiration interval (interval in seconds)

set <key> <expirationInterval> <value>

# Explicitly create an existing key-value as persistant

persist <key>

# Set more than one key at once

mset <key1> <value1> <key2> <value2>

# Concat something to an existing key

append <key1> <dataToConcat>

# Rename a key

rename <key> <newKeyName>

# Lists data structure && add a value to a list

lpush <key> <valueToAdd>
rpush <key> <valueToAdd>

# show a list content (it's like arrays, zero based)

lrange <key> <from> <to>

# length of a list

llen <keyList>

# Remove an element from a list (from front or back)

lpop <keyListName>
rpop <keyListName>

# insert an element into a list

linsert <keyList> [before|after] <valueName> <valueToInsert>

## Sets

# Create and add values in a set

sadd <listName> <value>

# Check if a value is memeber of a set

sismember <setName> <valueToCheck>

# List all values in a set

smembers <setName>

# length of a set

scard <setName>

# move a value from a set to an other set (the other will be created if not exist)

smove <originSet> <destinationSet> <valueToMove>

# Remove a value from a set

srem <setName> <valueToRemove>

## Sorted sets

zadd <sortedSet> <score> <value>

# return the rank for a value in a sorted set (lowest score)

zrank <sortedSet> <value>

# Show all the sortedSet elements

zrange <sortedSet> 0 -1

# Increment a value in a sortedSet

zincrby <sortedSet> <numToAdd> <valueToIncrement>

## Hash

# create a hash

hset <hash:key> <attribut> <value> ex: hset users:gary mail "gary@gmail.com"

# Get a value from a hash

hget <hash:key> <attribut>

# Get all attribut-values from a hash

hgetall <hash:key>

# Get all values from a hash

hvals <hash:key>

# Get all values from a hash

hkeys <hash:key>

# Increment a value from a hash

hincrby <hash:key> <attribut> <valueToAdd>

# Delete an attribut and its value from a hash

hdel <hash:key> <attribut>

# Length of a hash (number of "key-value" pairs)

hlen <hash:key>

## redis data persistance

# save data

save
-- a dump file (snapshot) is created in /var/lib/redis (you have to be sudo to read it)

# Save options (saves on disk every <interval> (in sec) if there is at least <numOfChanges> keys that have chaged

save <interval> <numOfChanges>

# redis configuration file

in /etc/redis/ you have the redis.conf file (you have to be sudo to read it)
