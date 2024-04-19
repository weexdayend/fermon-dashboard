import sys
import psycopg2
import csv
from datetime import datetime, timedelta

# Retrieve the path to the CSV file from command-line arguments
csv_file_path = sys.argv[1]

# PostgreSQL connection details
connection_string = "dbname='postgres' user='postgres.dqujmlinitflwbqxzmgp' host='aws-0-ap-southeast-1.pooler.supabase.com' password='o13VSoUqgdnBL8zh' sslmode=require"
conn = psycopg2.connect(connection_string)

# Initialize variables to track total batches, total rows, and total batch
total_batches = 0
total_rows = 0
total_batch = 0

# Initialize variables for calculating average batch duration and estimated time
total_duration = 0

# Count total rows in CSV file
with open(csv_file_path, 'r') as csv_file:
    total_rows = sum(1 for _ in csv_file) - 1  # Exclude header row

# Open the CSV file and read its contents
with open(csv_file_path, 'r') as csv_file:
    reader = csv.reader(csv_file)
    next(reader)  # Skip the header row if needed
    
    # Prepare a list to store rows for batch insertion
    rows_to_insert = []
    
    for row in reader:
        # Assuming the table has three columns: col1, col2, col3
        rows_to_insert.append((row[3],))  # Append data for batch insertion
        
        # Batch size for insertion
        if len(rows_to_insert) % 100 == 0:
            start_time = datetime.now()  # Record start time for batch insertion
            cursor = conn.cursor()
            cursor.executemany("INSERT INTO _testing_import_ (testing) VALUES (%s)", rows_to_insert)
            conn.commit()
            cursor.close()
            end_time = datetime.now()  # Record end time for batch insertion
            
            # Increment total batches
            total_batches += 1
            
            duration = end_time - start_time
            
            # Log batch insertion information
            cursor = conn.cursor()
            cursor.execute("INSERT INTO _log_testing_ (total_rows, batch_inserted, duration, total_batches) VALUES (%s, %s, %s, %s)", (total_rows, len(rows_to_insert), duration, total_batches))
            conn.commit()
            cursor.close()
            
            # Clear the list for the next batch
            rows_to_insert = []
    
    # Insert any remaining rows
    if rows_to_insert:
        start_time = datetime.now()  # Record start time for batch insertion
        cursor = conn.cursor()
        cursor.executemany("INSERT INTO _testing_import_ (testing) VALUES (%s)", rows_to_insert)
        conn.commit()
        cursor.close()
        end_time = datetime.now()  # Record end time for batch insertion
        
        # Increment total batches
        total_batches += 1
        
        # Calculate duration of batch insertion
        duration = end_time - start_time
        
        # Log batch insertion information
        cursor = conn.cursor()
        cursor.execute("INSERT INTO _log_testing_ (total_rows, batch_inserted, duration, total_batches) VALUES (%s, %s, %s, %s)", (total_rows, len(rows_to_insert), duration, total_batches))
        conn.commit()
        cursor.close()

# Print total batches, total rows, and estimated time
print(f"Total batches successfully inserted: {total_batches}")
print(f"Total rows: {total_rows}")

conn.close()
