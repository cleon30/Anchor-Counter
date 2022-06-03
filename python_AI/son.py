import sys
import json


# Read data from the Writable Stream
def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])


# Work work
def compute_sum(data):
    return sum(data)


def main():
    # Store the data as an array in 'data_input'
    data_input = read_in()

    # Compute the sum
    sum_result = compute_sum(data_input)

    # Return the sum
    sys.stdout.write(str(sum_result))

# Start the process
if __name__ == '__main__':
    main()