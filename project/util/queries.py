from util import data_manager

# doesn't work :/ 
# def get_everything(table_name):
#     print(table_name)
#     all_data = data_manager.execute_selecet(
#         """
#         SELECT * FROM %(table_name)s
#         """,
#         {"table_name": table_name},)
    
#     return all_data

# def get_everything_by_id(table_name, column_name, id):
#     """
#     """
#     all_data_by_id = data_manager.execute_selecet(
#         """
#         SELECT * FROM %(table_name)s
#         WHERE %(column_name)s = %(id)s
#         """,
#         {"table_name": table_name, "column_name": column_name, "id": id})
    
#     return all_data_by_id

def get_boards():
    """
    Gather all boards
    :return:
    """

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )

def get_statuses():
    """
    Gather all statuses
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM statuses
        ;
        """
    )

def get_status(status_id):
    """
    """
    matching_status = data_manager.execute_selecet(
        """
        SELECT * FROM statuses
        WHERE id = %(status_id)s
        """,
        {"status_id": status_id})
    
    return matching_status


def get_board(board_id):
    matching_board = data_manager.execute_select(
        """
        SELECT * FROM boards
        WHERE id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_board


def get_card(card_id):
    matching_board = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE id = %(card_id)s
        ;
        """
        , {"card_id": card_id})

    return matching_board


def get_cards_for_board(board_id):

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def get_columns_for_board(board_id):

    matching_columns = data_manager.execute_select(
        """
        SELECT * FROM columns
        WHERE board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_columns


def get_cards_for_column(column_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE column_id = %(column_id)s
        ;
        """
        , {"column_id": column_id})

    return matching_cards


def add_user(user_name,email,password,registration_time):
    data_manager.execute_insert( 
                """
                INSERT into 
                users (user_name, email, password, registration_time)
                values 
                (%(user_name)s, %(email)s, %(password)s, %(registration_time)s)"""
                , {'user_name': user_name, 'email': email, 'password':password,
                 'registration_time': registration_time})

def users_emails():
    users_emails = data_manager.execute_select(
        """
        SELECT email FROM users
        """)
    return users_emails

def user_data(email):
    user_data = data_manager.execute_select(
        """
        SELECT * FROM users
        WHERE email = %(email)s
        ;
        """
        , {"email": email}, fetchall=None)
    return user_data

def add_board(title):
    data_manager.execute_insert( 
                """
                INSERT into 
                boards (title)
                values 
                (%(title)s)"""
                , {'title': title})

def add_card(board_id, status_id, title, card_order):
    data_manager.execute_insert( 
                """
                INSERT into 
                cards (board_id, status_id, title, card_order)
                values 
                (%(board_id)s, %(status_id)s, %(title)s, %(card_order)s)"""
                , {'board_id': board_id, 'status_id': status_id, 'title': title, 'card_order': card_order})